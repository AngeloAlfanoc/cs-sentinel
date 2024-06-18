import { NextFunction, Request, Response } from "express";
import HttpStatus, {
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  REQUEST_TIMEOUT,
} from "http-status/lib";
import { TimeOutError } from "@/helpers/error";

export const notFoundError = (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(NOT_FOUND).json({
    code: NOT_FOUND,
    message: HttpStatus[NOT_FOUND],
    path: req.originalUrl,
  });
};

export const genericErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let resCode: number = err.status || INTERNAL_SERVER_ERROR;

  if (err.code === "ETIMEDOUT") {
    resCode = REQUEST_TIMEOUT;
    err = new TimeOutError(req.originalUrl);
  }

  // Respond only with the status code
  res.status(resCode).send();
};
