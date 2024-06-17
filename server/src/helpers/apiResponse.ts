import HttpStatus, { INTERNAL_SERVER_ERROR, OK } from 'http-status/lib';
import { ApiSuccessResponse } from '@/types/response';

export const apiResponse = <T>(data?: T): ApiSuccessResponse<T> => {
  return {
    status: OK,
    message: HttpStatus[OK] as string,
    data,
  };
};

export const InternalServerError = (res: Res) => {
  return res.status(INTERNAL_SERVER_ERROR).json(
    apiResponse({
      data: [],
      error: 'Internal server error',
    })
  );
};
