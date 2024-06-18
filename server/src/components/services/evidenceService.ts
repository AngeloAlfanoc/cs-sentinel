import { Collection, ObjectId } from 'mongodb';
import MongoDB from '@/db/database';

interface DBCollections {
  suspectsCollection: Collection;
  evidenceCollection: Collection;
  suspectCommentsCollection: Collection;
  evidenceCommentsCollection: Collection;
  reviewedCollection: Collection;
  flaggedEvidenceCollection: Collection;
}
export class EvidenceService {
  private static dbCollections: DBCollections;

  private static async initDBCollections() {
    if (!this.dbCollections) {
      const db = await MongoDB.connectDB();
      this.dbCollections = {
        suspectsCollection: db.collection('suspects'),
        evidenceCollection: db.collection('evidence'),
        reviewedCollection: db.collection('reviewed'),
        suspectCommentsCollection: db.collection('suspectComments'),
        evidenceCommentsCollection: db.collection('evidenceComments'),
        flaggedEvidenceCollection: db.collection('flaggedEvidences'),
      };
    }
    return this.dbCollections;
  }
  static async getEvidenceBySteamId(steamId: string) {
    const { evidenceCollection } = await EvidenceService.initDBCollections();

    const evidence = await evidenceCollection
      .find({ steamId: steamId })
      .toArray();

    if (!evidence) {
      throw new Error('Evidence not found');
    }

    return evidence;
  }

  static async getEvidencesByFlagged(userId?: string) {
    const { evidenceCollection, flaggedEvidenceCollection } =
      await EvidenceService.initDBCollections();

    let evidences;

    if (!userId) {
      // Fetch all evidences if no userId is provided
      evidences = await evidenceCollection.find({}).toArray();
    } else {
      // Fetch flagged evidence documents for the user
      const flaggedEvidences = await flaggedEvidenceCollection
        .find({ userId })
        .toArray();
      const flaggedEvidenceIds = flaggedEvidences.map(
        (f) => new ObjectId(f.evidenceId)
      );

      // Logging to debug flagged evidence IDs
      console.log('Flagged Evidence IDs:', flaggedEvidenceIds);

      // Fetch evidences excluding the flagged ones
      evidences = await evidenceCollection
        .find({
          _id: { $nin: flaggedEvidenceIds },
        })
        .toArray();

      // Logging to debug the final evidences
      console.log('Evidences after filtering:', evidences);
    }

    return evidences;
  }

  static async getEvidenceById(evidenceId: string) {
    const { evidenceCollection } = await EvidenceService.initDBCollections();
    const evidence = evidenceCollection.findOne({
      _id: new ObjectId(evidenceId),
    });

    if (!evidence) {
      throw new Error('Evidence not found');
    }

    return evidence;
  }

  static async flagEvidenceByUser(evidenceId: string, userId: string) {
    const { flaggedEvidenceCollection } =
      await EvidenceService.initDBCollections();

    await flaggedEvidenceCollection.insertOne({
      evidenceId: evidenceId,
      userId: userId,
    });

    const evidences = this.getEvidencesByFlagged(userId);
    return evidences;
  }
}
