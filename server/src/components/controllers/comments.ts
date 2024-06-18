import { BAD_REQUEST, OK } from 'http-status';
import { CommentService } from '../services/commentService';
import { apiResponse, InternalServerError } from '@/helpers/apiResponse';

export class CommentController {
  static submitSuspectComment = async (req: Req, res: Res) => {
    try {
      const { comment } = req.body;
      const { user } = req;
      const { message, error } = await CommentService.submitSuspectComment(
        comment,
        user!
      );

      if (error) {
        return res.status(BAD_REQUEST).json(apiResponse({ error }));
      }

      return res.status(OK).json(apiResponse({ message }));
    } catch (error) {
      console.error('Error in submitting suspect data:', error);
      return InternalServerError(res);
    }
  };

  static getSuspectCommentsBySteamId = async (req: Req, res: Res) => {
    try {
      const { steamId } = req.params;
      const comments = await CommentService.getCommentsBySteamId(steamId);
      return res.status(OK).json(
        apiResponse({
          message: 'Successfully retrieved comments from this suspect',
          data: comments,
        })
      );
    } catch (error) {
      console.error('Error in getting comments of this suspect:', error);
      return InternalServerError(res);
    }
  };

  static deleteSuspectCommentByUserId = async (req: Req, res: Res) => {
    try {
      const { commentId } = req.params;
      const { user } = req;
      const { message, error } =
        await CommentService.deleteSuspectCommentByCurrentUser(
          commentId,
          user!
        );
      if (error) {
        return res.status(BAD_REQUEST).json(apiResponse({ error }));
      }
      return res.status(OK).json(apiResponse({ message }));
    } catch (error) {
      console.error('Error in deleting comment:', error);
      return InternalServerError(res);
    }
  };

  static submitEvidenceCommentByEvidenceId = async (req: Req, res: Res) => {
    try {
      const { comment } = req.body;
      const { user } = req;
      const { message, error } = await CommentService.submitEvidenceComment(
        comment,
        user!
      );
      if (error) {
        return res.status(BAD_REQUEST).json(apiResponse({ error }));
      }
      return res.status(OK).json(apiResponse({ message }));
    } catch (error) {
      console.error('Error in submitting evidence data:', error);
      return InternalServerError(res);
    }
  };

  static getEvidenceCommentsByEvidenceId = async (req: Req, res: Res) => {
    try {
      const { evidenceId } = req.params;
      const comments = await CommentService.getCommentsByEvidenceId(evidenceId);
      return res.status(OK).json(
        apiResponse({
          message: 'Successfully retrieved comments from this evidence',
          data: comments,
        })
      );
    } catch (error) {
      console.error('Error in getting comments of this evidence:', error);
      return InternalServerError(res);
    }
  };
}
