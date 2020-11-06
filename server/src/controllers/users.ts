import {UserModel} from '../models/users'
import bcrypt from 'bcrypt'

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
  try {
    const fetchedUser: any = await UserModel.findOne({username: req.body.username})
    if (!fetchedUser) {
      res.status(403);
      res.send('Login error');
      return;
    }
    const userHashedPassword = fetchedUser.password;
    bcrypt.compare(req.body.password, userHashedPassword, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      if (result) res.send('successful login');
      else {
        res.status(403);
        res.send('Forbidden')
      }
    })
  }
  catch (err) {
    console.error(err)
  }
}