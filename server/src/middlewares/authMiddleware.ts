import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

export const authenticateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access token is missing or invalid' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token verification failed' });
    }
    req.user = user;
    next();
    return;
  });

  // Adding a return statement at the end
  return;
};
