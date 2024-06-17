import { BAD_REQUEST, OK } from 'http-status';
import { SuspectService } from '../services/suspectService';
import { apiResponse, InternalServerError } from '@/helpers/apiResponse';

export class SuspectController {
  static submitSuspectData = async (req: Req, res: Res) => {
    try {
      const suspectData = req.body;
      const { steamId, error } = await SuspectService.submitSuspectData(
        suspectData
      );

      if (error) {
        return res.status(BAD_REQUEST).json(apiResponse({ error }));
      }

      return res.status(OK).json(
        apiResponse({
          message: 'Data submitted successfully',
          steamId: steamId,
        })
      );
    } catch (error) {
      console.error('Error in submitting suspect data:', error);
      return InternalServerError(res);
    }
  };

  static getSuspects = async (_req: Req, res: Res) => {
    try {
      const suspects = await SuspectService.getAllSuspects();

      return res.status(OK).json(
        apiResponse({
          message: 'Successfully retrieved suspects',
          data: suspects,
        })
      );
    } catch (error) {
      console.error('Error in getting suspects:', error);
      return InternalServerError(res);
    }
  };

  static getSuspectBySteamId = async (req: Req, res: Res) => {
    try {
      const { steamId } = req.params;
      const suspect = await SuspectService.getSuspectBySteamId(steamId);
      return res.status(OK).json(
        apiResponse({
          message: 'Successfully retrieved suspect',
          data: suspect,
        })
      );
    } catch (error) {
      console.error('Error in getting suspect:', error);
      return InternalServerError(res);
    }
  };

  static addSuspectLink = async (req: Req, res: Res) => {
    try {
      const { steamId } = req.params;
      const { link, type } = req.body;

      if (!link || !type) {
        return res.status(BAD_REQUEST).json({
          status: BAD_REQUEST,
          message: 'Link and type are required.',
        });
      }

      const { error } = await SuspectService.addLinkToSuspect(steamId, {
        link,
        type,
      });

      if (error) {
        return res.status(BAD_REQUEST).json(apiResponse({ error }));
      }

      return res
        .status(OK)
        .json(apiResponse({ message: 'Link added/updated successfully' }));
    } catch (error) {
      console.error('Error in adding link:', error);
      return InternalServerError(res);
    }
  };
}
