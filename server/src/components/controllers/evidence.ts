import { BAD_REQUEST, OK } from 'http-status';
import { EvidenceService } from '../services/evidenceService';
import { apiResponse, InternalServerError } from '@/helpers/apiResponse';

export class EvidenceController {
  static getEvidenceById = async (req: Req, res: Res) => {
    try {
      const { evidenceId } = req.params;
      const evidence = await EvidenceService.getEvidenceById(evidenceId);
      return res.status(OK).json(
        apiResponse({
          message: 'Successfully retrieved evidence',
          data: evidence,
        })
      );
    } catch (error) {
      console.error('Error in getting evidence:', error);
      return InternalServerError(res);
    }
  };

  static getEvidenceBySteamId = async (req: Req, res: Res) => {
    try {
      const { steamId } = req.params;
      const evidence = await EvidenceService.getEvidenceBySteamId(steamId);
      return res.status(OK).json(
        apiResponse({
          message: 'Successfully retrieved evidence',
          data: evidence,
        })
      );
    } catch (error) {
      console.error('Error in getting evidence:', error);
      return InternalServerError(res);
    }
  };

  static getEvidencesByFlagged = async (req: Req, res: Res) => {
    try {
      const { user } = req;
      let evidences;
      console.log('user', user?.user.id);
      if (!user) {
        evidences = await EvidenceService.getEvidencesByFlagged();
      }
      evidences = await EvidenceService.getEvidencesByFlagged(user?.user.id);
      return res.status(OK).json(
        apiResponse({
          message: 'Successfully retrieved all evidence',
          data: evidences,
        })
      );
    } catch (error) {
      console.error('Error in getting evidence:', error);
      return InternalServerError(res);
    }
  };

  static flagEvidenceByUser = async (req: Req, res: Res) => {
    try {
      const { evidenceId } = req.params;
      const { user } = req;
      if (!user) {
        return res
          .status(BAD_REQUEST)
          .json(apiResponse({ error: 'User not found' }));
      }
      const evidence = await EvidenceService.flagEvidenceByUser(
        evidenceId,
        user.user.id
      );
      return res.status(OK).json(
        apiResponse({
          message: 'Successfully flagged evidence',
          data: evidence,
        })
      );
    } catch (error) {
      console.error('Error in flagging evidence:', error);
      return InternalServerError(res);
    }
  };
}
