import { Collection } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { NextFunction } from 'express';
import MongoDB from '@/db/database';

interface DBCollections {
  actionCollection: Collection;
}

export class ActionLogger {
  private static dbCollections: DBCollections;
  private static async initDBCollections() {
    if (!this.dbCollections) {
      const db = await MongoDB.connectDB();
      this.dbCollections = {
        actionCollection: db.collection('actionCollection'),
      };
    }
    return this.dbCollections;
  }
  static async logAction(
    req: Req & any,
    res: Res,
    next: NextFunction
  ): Promise<void> {
    try {
      const { user } = req;
      const userId = user?.id || 'unknown'; // Extract userId from the request
      const action = req.originalUrl; // Use the original URL as the action or customize as needed
      const { actionCollection } = await this.initDBCollections();

      // Insert action into action collection
      const insertResult = await actionCollection.insertOne({
        userId,
        action,
        currentTime: new Date(),
        corelationId: uuidv4(),
      });

      if (!insertResult.acknowledged) {
        throw new Error('Failed to insert action');
      }

      next();
    } catch (error: any) {
      console.error('Failed to insert action: ', error);
      res
        .status(500)
        .json({ error: error.message || 'Unknown error occurred' });
    }
  }
}
