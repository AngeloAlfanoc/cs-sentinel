import jwt from 'jsonwebtoken';

function authenticateToken(req: any, res: any, next: any) {
  const token = req.cookies.token;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
