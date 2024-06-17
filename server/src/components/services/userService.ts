import jwt from 'jsonwebtoken';
import { Collection, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { compare, hash } from '@/utils/crypt';
import MongoDB from '@/db/database';
dotenv.config();

type UserData = {
  email: string;
  password: string;
};

interface DBCollections {
  userCollection: Collection;
}

export class UserService {
  private static dbCollections: DBCollections;

  private static async initDBCollections() {
    try {
      if (!this.dbCollections) {
        const db = await MongoDB.connectDB();
        this.dbCollections = {
          userCollection: db.collection('users'),
        };
      }
      return this.dbCollections;
    } catch (error) {
      console.error('Database Connection Error:', error);
      throw new Error('Failed to connect to the database.');
    }
  }

  static async getUserCredential(userData: UserData): Promise<any> {
    try {
      const { userCollection } = await UserService.initDBCollections();

      const user = await userCollection.findOne({ email: userData.email });

      if (!user) {
        return { error: 'User not found', user: null, token: null };
      }

      const isPasswordValid = await compare(userData.password, user.password);
      if (!isPasswordValid) {
        return { error: 'Invalid credentials', user: null, token: null };
      }

      const secretKey = process.env.JWT_SECRET_KEY;
      if (!secretKey) {
        throw new Error('JWT secret key is not set.');
      }

      const token = jwt.sign(
        {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            signupDate: user.signupDate,
          },
        },
        secretKey,
        { expiresIn: '24h', algorithm: 'HS256' }
      );

      return {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          signupDate: user.signupDate,
        },
        token,
        error: null,
      };
    } catch (error) {
      console.error('Service Error:', error);
      return { error: 'A service error occurred.', user: null, token: null };
    }
  }

  static async createNewUserCredential(
    email: string,
    password: string
  ): Promise<any> {
    try {
      const { userCollection } = await UserService.initDBCollections();
      const user = await userCollection.findOne({ email: email });

      if (user) {
        return { error: 'User already exists.', user: null };
      } else {
        const hashedPassword = await hash(password);
        const newUser = await userCollection.insertOne({
          email: email,
          password: hashedPassword,
        });

        return { user: newUser, error: null };
      }
    } catch (error) {
      console.error('Service Error:', error);
      return { error: 'A service error occurred.', user: null };
    }
  }

  static async getUserInfo(userId: string): Promise<any> {
    try {
      const { userCollection } = await UserService.initDBCollections();
      const user = await userCollection.findOne({ _id: new ObjectId(userId) });
      if (!user) {
        return { user: null, error: 'User not found', steam: null };
      }
      return {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          signupDate: user.signupDate,
        },
        steam: null,
        error: null,
      };
    } catch (error) {
      console.error('Service Error:', error);
      return { error: 'A service error occurred.', user: null, steam: null };
    }
  }
}
