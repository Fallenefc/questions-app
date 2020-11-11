import { UserModel } from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MG_API_KEY, MG_DATA, MG_DOMAIN, SECRET_KEY } from "../environment";
import mailgun from 'mailgun-js';

const DOMAIN = MG_DOMAIN;
const mg = mailgun({apiKey: MG_API_KEY, domain: DOMAIN});

export const registerUser = async (req: any, res: any) => {
  try {
    // Throws an error if missing password or username in the request body
    if (!req.body.password || !req.body.username) {
      throw new Error();
    }
    // Throws an error if user already exists
    const userExists = await UserModel.findOne({ username: req.body.username });
    if (userExists) {
      throw new Error();
    }

    // Hashes and stores user with hashed password
    bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
      if (err) {
        res.json({
          error: err,
        });
      }
      const user = new UserModel({
        username: req.body.username,
        password: hashedPass,
        resetPasswordLink: ''
        // name: req.body.name
      });
      await UserModel.create(user);
      console.log(`Added to database: ${JSON.stringify(user)}`);
      res.send(user); // Sends the user data back as a response - Should I remove that?
    });
  } catch (err) {
    res.sendStatus(403);
  }
};

export const userLogIn = async (req: any, res: any) => {
  // sets user email and password to be the req body equivalent, as it makes it more readable
  const { username, password } = req.body;

  try {
    // gets the username from the database
    const fetchedUser: any = await UserModel.findOne({ username });

    // if the user does not exist in the database
    if (!fetchedUser) throw new Error();

    // gets the hashed password and uses bcrypt compare method to see if password matches
    const userHashedPassword = fetchedUser.password;
    const isValid = await bcrypt.compare(password, userHashedPassword);

    // if passwords does not match:
    if (!isValid) throw new Error();

    // Else, if everything is correct, it will:
    // 1. Send the user data (without the password), to the client
    // 2. Send the token to the client so it can be stored and reused
    return res.status(200).json({
      user: {
        id: fetchedUser._id,
        username: fetchedUser.username,
        name: fetchedUser.name
      },
      token: jwt.sign({ _id: fetchedUser._id }, SECRET_KEY, {
        expiresIn: 86400,
      }),
    });
    // All the errors are going to be set as 403, as I do not want to know the user to know what caused the error
  } catch (err) {
    console.error(err);
    return res.status(403).send({
      error: "Forbidden",
    });
  }
};


export const forgotPassword = async (req: any, res: any): Promise<void> => {
  const { username } = req.body;

  try {
    const user:any = await UserModel.find({username});
    const token = jwt.sign({ _id: user._id }, SECRET_KEY, {expiresIn: '30m'});

    const data = {
      ...MG_DATA,
      to: username,
      html: `http://localhost:5000/resetpassword/${token}`,
    };

    const filter = { username };
    const update = { resetPasswordLink: token };

    const test = await UserModel.findOneAndUpdate(filter, update);
    console.log(test);

    mg.messages().send(data, (err, _) => {
      if (err) {
        return res.json({ error: err.message });
      }
      return res.sendStatus(200);
    });


  } catch (err) {
    res.sendStatus(401);
  }
}