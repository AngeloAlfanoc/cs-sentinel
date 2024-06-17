import { Request, Response, NextFunction } from 'express';
import { ReqUser } from './request/user';

declare global {
  type TodoType = any;
  type Req = Request & { user?: ReqUser };
  type Res = Response;
  type NextFn = NextFunction;
  type ResponseData<T> = {
    opcode: number;
    message: string;
    data?: T;
  };
}
