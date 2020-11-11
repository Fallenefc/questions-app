import {UserModel} from '../models/users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = (req: any, res: any) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
    if (err) {
      res.json({
        error: err
      })
    }
    const user = new UserModel({
      username: req.body.username,
      password: hashedPass
    })
    await UserModel.create(user);
    console.log(`Added to database: ${JSON.stringify(user)}`)
    res.send(user)
  })
}

export const userLogIn = async (req: any, res: any) => {

  const {username, password} = req.body;

  try {
    const fetchedUser: any = await UserModel.findOne({username})

    if (!fetchedUser) {
      res.status(403);
      res.send({
        message: "Wrong username/password combination"
      });
      return;
    }
    const userHashedPassword = fetchedUser.password;

    const isValid = await bcrypt.compare(password, userHashedPassword);

    if (isValid) {
      return res.status(200).json({
        user: {
          id: fetchedUser._id,
          username: fetchedUser.username,
        },
        token: jwt.sign({user: fetchedUser._id}, 'secret', {
          expiresIn: 86400,
        })
      })
    }
    else {
      return res.status(403).json("User login failed");
    }
  }
  catch (err) {
    console.error(err);
    return res.status(500).send('Server error')
  }
}