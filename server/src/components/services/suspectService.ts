import { Collection } from 'mongodb';
import { SteamApiService } from './steamApiService';
import { SuspectData } from '@/types/response/suspect';
import MongoDB from '@/db/database';

interface DBCollections {
  suspectsCollection: Collection;
  evidenceCollection: Collection;
  commentsCollection: Collection;
  linksCollection: Collection;
  suspectRelationShip: Collection;
}

export class SuspectService {
  private static dbCollections: DBCollections;
  private static async initDBCollections() {
    if (!this.dbCollections) {
      const db = await MongoDB.connectDB();
      this.dbCollections = {
        suspectsCollection: db.collection('suspects'),
        evidenceCollection: db.collection('evidence'),
        commentsCollection: db.collection('suspectComments'),
        linksCollection: db.collection('suspectLinks'),
        suspectRelationShip: db.collection('suspectRelationship'),
      };
    }
    return this.dbCollections;
  }

  static async submitSuspectData(
    suspectData: SuspectData
  ): Promise<{ error?: string; steamId?: string }> {
    try {
      const { suspectsCollection, evidenceCollection } =
        await this.initDBCollections();

      const steamIdResult = await SteamApiService.resolveVanityURL(
        suspectData.steamLink
      );
      const steamId = steamIdResult.steamId;

      if (!steamId) {
        console.error('Steam ID is null or undefined');
        return { error: 'Steam ID is required but was not provided' };
      }

      const playerSummaries = await SteamApiService.getPlayerSummaries(steamId);
      const steamPlayer =
        playerSummaries.length > 0 ? playerSummaries[0] : null;

      if (!steamPlayer) {
        throw new Error('Player not found with the given Steam ID.');
      }

      const suspectObject = {
        steamId: steamId,
        steamProfileLink: suspectData.steamLink,
        faceitLink: suspectData.faceitLink,
        steamRepLink: suspectData.steamRepLink,
        submittedCount: suspectData.submittedCount ?? 0,
        personaName: steamPlayer.personaname,
        avatar: steamPlayer.avatarfull,
        profileUrl: steamPlayer.profileurl,
        lastLogoff: steamPlayer.lastLogoff,
        profileState: steamPlayer.profileState,
        communityVisibilityState: steamPlayer.communityvisibilitystate,
      };

      const evidence = {
        steamId: steamId,
        steamLink: suspectData.steamLink,
        videoLink: suspectData.videoLink,
        description: suspectData.description,
        type: suspectData.type,
        name: suspectData.evidenceName,
      };

      const candidate = await suspectsCollection.findOne({ steamId: steamId });

      if (!candidate) {
        await suspectsCollection.insertOne(suspectObject);
      } else {
        await suspectsCollection.findOneAndUpdate(
          { steamId: steamId },
          { $inc: { submittedCount: 1 } }
        );
      }

      const evidenceResult = await evidenceCollection.insertOne(evidence);

      if (!evidenceResult.acknowledged) {
        throw new Error('Failed to insert evidence data');
      }

      return { steamId: steamId };
    } catch (error: any) {
      console.error('Failed to submit suspect data:', error);
      return { error: error.message || 'Unknown error occurred' };
    }
  }

  static async getAllSuspects() {
    try {
      const {
        suspectsCollection,
        evidenceCollection,
        linksCollection,
        suspectRelationShip,
      } = await SuspectService.initDBCollections();

      const suspects = await suspectsCollection.find({}).toArray();
      const evidence = await evidenceCollection.find({}).toArray();
      const links = await linksCollection.find({}).toArray();
      const relationships = await suspectRelationShip.find({}).toArray();
      console.log(suspects)
      const suspectsMap: any = new Map(
        suspects.map((suspect) => [
          suspect.steamId,
          {
            avatar: suspect.avatar,
            personaName: suspect.personaName,
            profileUrl: suspect.profileUrl,
            steamId: suspect.steamId,
            steamProfileLink: suspect.steamProfileLink,
            _id: String(suspect._id),
            links: [],
            evidenceCount: 0,
            relationshipsCount: 0,
          },
        ])
      );

      evidence.forEach((evidenceItem) => {
        if (suspectsMap.has(evidenceItem.steamId)) {
          const suspect = suspectsMap.get(evidenceItem.steamId);
          if (suspect) {
            suspect.evidenceCount += 1;
          }
        }
      });

      links.forEach((linkItem) => {
        if (suspectsMap.has(linkItem.steamId)) {
          const suspect = suspectsMap.get(linkItem.steamId);
          if (suspect) {
            suspect.links.push({
              linkId: String(linkItem._id),
              link: linkItem.link,
              type: linkItem.type,
              steamId: linkItem.steamId,
            });
          }
        }
      });

      relationships.forEach((relationshipItem) => {
        if (suspectsMap.has(relationshipItem.steamId)) {
          const suspect = suspectsMap.get(relationshipItem.steamId);
          if (suspect) {
            suspect.relationshipsCount += 1;
          }
        }
      });

      // Convert the map back to an array of suspects with counts
      const combinedData = Array.from(suspectsMap.values());

      return combinedData;
    } catch (error) {
      console.error('Failed to retrieve suspects:', error);
      throw new Error('Failed to retrieve suspects');
    }
  }

  static async getSuspectBySteamId(steamId: string) {
    const { suspectsCollection, linksCollection } =
      await SuspectService.initDBCollections();

    const suspect = await suspectsCollection.findOne({ steamId });
    const links = await linksCollection.find({ steamId }).toArray();

    if (!suspect) {
      throw new Error('Suspect not found');
    }

    // Return a new object with the suspect details and the links
    return { ...suspect, links };
  }

  static async addLinkToSuspect(
    steamId: string,
    linkData: { link: string; type: string }
  ): Promise<{ error?: string }> {
    try {
      const { linksCollection } = await this.initDBCollections();

      // Check if the link already exists
      const existingLink = await linksCollection.findOne({
        steamId,
        type: linkData.type,
      });

      if (existingLink) {
        // Update the existing link
        const updateResult = await linksCollection.updateOne(
          { steamId, type: linkData.type },
          { $set: { link: linkData.link } }
        );

        if (updateResult.modifiedCount === 0) {
          throw new Error('Failed to update link');
        }
      } else {
        // Create a new link entry
        const insertResult = await linksCollection.insertOne({
          steamId,
          ...linkData,
        });

        if (!insertResult.acknowledged) {
          throw new Error('Failed to insert new link');
        }
      }

      return {};
    } catch (error: any) {
      console.error('Failed to add/update link to suspect:', error);
      return { error: error.message || 'Unknown error occurred' };
    }
  }

  static async addRelationshipToSuspect(
    steamId: string,
    linkData: { link: string; type: string }
  ): Promise<{ error?: string }> {
    try {
      const { suspectRelationShip } = await this.initDBCollections();

      // Create a new link entry
      const insertResult = await suspectRelationShip.insertOne({
        steamId,
        ...linkData,
      });

      if (!insertResult.acknowledged) {
        throw new Error('Failed to insert new link');
      }

      return {};
    } catch (error: any) {
      console.error('Failed to add/update link to suspect:', error);
      return { error: error.message || 'Unknown error occurred' };
    }
  }
}
