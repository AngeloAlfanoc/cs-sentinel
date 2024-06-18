import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from 'http-status';
import { UserService } from '../services/userService';
import { InternalServerError, apiResponse } from '@/helpers/apiResponse';

export class UserController {
  static registerNewUser = async (req: Req, res: Res) => {
    try {
      const { email, password } = req.body;

      // Validate request parameters
      if (!email || !password) {
        return res.status(BAD_REQUEST).json({
          status: BAD_REQUEST,
          message: 'Email and password are required.',
        });
      }

      const { user, error } = await UserService.createNewUserCredential(
        email,
        password
      );

      if (error) {
        return res.status(BAD_REQUEST).json({
          status: BAD_REQUEST,
          message: error,
        });
      }

      return res.status(CREATED).json({
        status: CREATED,
        message: 'User created successfully',
        user,
      });
    } catch (error) {
      console.error('Error in registering a new user:', error);

      return InternalServerError(res);
    }
  };

  static getUserCredentials = async (req: Req, res: Res) => {
    try {
      const userData = req.body;
      const userDataObject = {
        email: userData.email,
        password: Buffer.from(userData.password, 'base64').toString('latin1'),
      };
      const { user, token, error } = await UserService.getUserCredential(
        userDataObject
      );

      if (!user) {
        return res.status(UNAUTHORIZED).json(apiResponse({ error }));
      }

      return res.status(OK).json(
        apiResponse({
          message: 'Authentication successful',
          token,
          user,
        })
      );
    } catch (error) {
      console.error('Error in getting user credentials:', error);

      return InternalServerError(res);
    }
  };

  static getUserInfoByUserId = async (req: Req, res: Res) => {
    try {
      const userId = req.params.userId;
      const { user, steam, error } = await UserService.getUserInfo(userId);

      if (!user) {
        return res.status(UNAUTHORIZED).json(apiResponse({ error }));
      }

      return res.status(OK).json(
        apiResponse({
          message: 'Info Fetched Successfully',
          steam,
          user,
        })
      );
    } catch (error) {
      console.error('Error in getting user info:', error);
      return InternalServerError(res);
    }
  };
}
