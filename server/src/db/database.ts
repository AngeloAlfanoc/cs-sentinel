import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import CONFIG from '@/config';

export class MongoDB {
  private static client: MongoClient;
  private static dbInstance: Db;

  public static async connectDB(): Promise<Db> {
    if (!this.dbInstance) {
      const mongoClientOptions: MongoClientOptions = {
        tls: true,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000,
        maxPoolSize: 50,
        minPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        heartbeatFrequencyMS: 10000,
        retryWrites: true,
        writeConcern: { w: 'majority', wtimeout: 2500 },
        readPreference: 'primaryPreferred',
      };

      this.client = new MongoClient(CONFIG.DB.URI!, mongoClientOptions);

      try {
        await this.client.connect();
        this.dbInstance = this.client.db('methods');
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Could not connect to MongoDB', error);
        process.exit(1);
      }
    }

    return this.dbInstance;
  }

  public static getDbInstance(): Db {
    if (!this.dbInstance) {
      throw new Error('Database not initialized. Call connectDB first.');
    }
    return this.dbInstance;
  }

  public static async disconnectDB(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }
}

export default MongoDB;
