import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Middleware for verifying JWT token
 * @param req The request object
 * @param res The response object
 * @param next The next middleware function
 */
export const verifyToken = (
  req: any,
  res: Response,
  next: NextFunction
): void | Response<any, Record<string, any>> => {
  const authHeader = req.headers['authorization'];

  // Extracting token from authorization header
  const token = authHeader && authHeader.split(' ')[1];

  // Checking if the token is null
  if (!token) {
    return res.status(401).send('Authorization failed. No access token.');
  }

  // Verifying if the token is valid.
  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.status(403).send('Could not verify token');
    }
    if (!user) {
      return res.status(403).send('Invalid token');
    }
    // Assuming you've extended the Request interface to include a user property
    req.user = user;
    next();
    return;
  });
};
