import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../environment';
import { Request, Response } from 'express';
import { UserModel } from '../models/users';


const authMiddleware = async (req: any, res: Response, next: any) => { // change any types later

  // Get the token from the header, if there is no token, sends forbidden status
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(403);
  const [, token] = authHeader.split(' ');

  try {
    const jwtCheck: any = jwt.verify(token, SECRET_KEY); // change this any type later!
    const user = await UserModel.findOne({_id: jwtCheck._id});
    // If user does not exist in the database
    if (!user) return res.sendStatus(401);
    req.user = user;
    console.log(user)
    next();
  // if user is not verified
  } catch (error) {
    res.sendStatus(403);
  }
};

export default authMiddleware;