import { Collection, ObjectId } from 'mongodb';

import { Comment } from '@/types/request/comment';
import MongoDB from '@/db/database';
import { ReqUser } from '@/types/request/user';
import { timeSince } from '@/helpers/date-helpers';

interface DBCollections {
  suspectCommentsCollection: Collection;
  evidenceCommentsCollection: Collection;
  userCollection: Collection;
}

export class CommentService {
  private static dbCollections: DBCollections;

  private static async initDBCollections() {
    if (!this.dbCollections) {
      const db = await MongoDB.connectDB();
      this.dbCollections = {
        suspectCommentsCollection: db.collection('suspectComments'),
        evidenceCommentsCollection: db.collection('evidenceComments'),
        userCollection: db.collection('users'),
      };
    }
    return this.dbCollections;
  }

  static async submitSuspectComment(comment: Comment, currentUser: ReqUser) {
    try {
      const { suspectCommentsCollection } =
        await CommentService.initDBCollections();

      if (!suspectCommentsCollection) {
        throw new Error('Problem with dbo');
      }

      const newComment = {
        ...comment,
        userId: currentUser.user.id,
        timeStamp: new Date(),
      };

      await suspectCommentsCollection.insertOne(newComment);

      return { message: 'Comment submitted successfully' };
    } catch (error: any) {
      console.error('Failed to submit suspect data:', error);
      return { error: error.message || 'Unknown error occurred' };
    }
  }

  static async getCommentsBySteamId(steamId: string) {
    const { suspectCommentsCollection, userCollection } =
      await CommentService.initDBCollections();

    const comments = await suspectCommentsCollection
      .find({ steamId: steamId })
      .sort({ timeStamp: -1 }) // Sort by timestamp in descending order
      .toArray();

    const commentsWithUserInfo = await Promise.all(
      comments.map(async (comment) => {
        try {
          const userObjectId = new ObjectId(comment.userId);
          const user = await userCollection.findOne({ _id: userObjectId });

          return {
            message: comment.message,
            commentId: comment._id,
            timeStamp: timeSince(comment.timeStamp),
            user: {
              userId: user?._id,
              email: user?.email ?? '',
            },
          };
        } catch (error) {
          // Log the error if any occurred while fetching user details
          console.error('Error fetching user details:', error);
          // Return the original comment
          return {
            message: comment.message,
            commentId: comment._id,
            user: {},
          };
        }
      })
    );

    return commentsWithUserInfo;
  }

  static async getCommentsByEvidenceId(evidenceId: string) {
    const { evidenceCommentsCollection, userCollection } =
      await CommentService.initDBCollections();

    const comments = await evidenceCommentsCollection
      .find({ evidenceId: evidenceId })
      .sort({ timeStamp: -1 }) // Sort by timestamp in descending order

      .toArray();

    if (!comments) {
      throw new Error('Comments not found');
    }

    const commentsWithUserInfo = await Promise.all(
      comments.map(async (comment) => {
        try {
          const userObjectId = new ObjectId(comment.userId);
          const user = await userCollection.findOne({ _id: userObjectId });

          return {
            message: comment.message,
            commentId: comment._id,
            timeStamp: timeSince(comment.timeStamp),
            user: {
              userId: user?._id,
              email: user?.email ?? '',
            },
          };
        } catch (error) {
          // Log the error if any occurred while fetching user details
          console.error('Error fetching user details:', error);
          // Return the original comment
          return {
            message: comment.message,
            commentId: comment._id,
            user: {},
          };
        }
      })
    );

    return commentsWithUserInfo;
  }

  static async deleteSuspectCommentByCurrentUser(
    commentId: string,
    user: ReqUser
  ) {
    try {
      const { suspectCommentsCollection } =
        await CommentService.initDBCollections();

      // Convert commentId to ObjectId
      const commentObjectId = new ObjectId(commentId);

      // Find the comment by _id and userId
      const comment = await suspectCommentsCollection.findOne({
        _id: commentObjectId,
        userId: user.user.id,
      });

      if (!comment) {
        throw new Error(
          'Comment not found or you do not have permission to delete this comment'
        );
      }

      // Remove the comment
      await suspectCommentsCollection.deleteOne({ _id: commentObjectId });

      return {
        message: 'Comment deleted successfully',
        commentId: comment._id,
      };
    } catch (error) {
      // Log the error if any occurred while fetching user details
      console.error('Error fetching user details:', error);
      // Return the original comment
      return {
        error:
          'Comment not found or you do not have permission to delete this comment',
        commentId: commentId,
      };
    }
  }

  static async submitEvidenceComment(comment: Comment, currentUser: ReqUser) {
    try {
      const { evidenceCommentsCollection } =
        await CommentService.initDBCollections();

      if (!evidenceCommentsCollection) {
        throw new Error('Problem with dbo');
      }

      const newComment = {
        ...comment,
        userId: currentUser.user.id,
        timeStamp: new Date(),
        evidenceId: comment.evidenceId,
      };

      await evidenceCommentsCollection.insertOne(newComment);

      return { message: 'Comment submitted successfully' };
    } catch (error: any) {
      console.error('Failed to submit evidence data:', error);
      return { error: error.message || 'Unknown error occurred' };
    }
  }
}
