import { UserModel } from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MG_API_KEY, MG_DATA, MG_DOMAIN, SECRET_KEY } from "../environment";
import mailgun from "mailgun-js";

const DOMAIN = MG_DOMAIN;
const mg = mailgun({ apiKey: MG_API_KEY, domain: DOMAIN });

export const registerUser = async (req: any, res: any) => {
  try {
    // Throws an error if missing password or username in the request body
    if (!req.body.password || !req.body.username || !req.body.name) {
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
        resetPasswordLink: "",
        name: req.body.name,
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
        name: fetchedUser.name,
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
  // gets the user email from the request body
  const { username } = req.body;

  try {
    // finds the user in the database, generates a temporary token
    const user: any = await UserModel.find({ username });
    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: "30m" });

    // this is what will be sent on the email
    const data = {
      ...MG_DATA,
      to: username,
      html: `http://localhost:5000/resetpassword/${token}`,
    };

    // filter and update, then update the user with a new reset password token
    // TODO: Make the token have an expiration timer
    const filter = { username };
    const update = { resetPasswordLink: token };
    await UserModel.findOneAndUpdate(filter, update);

    // Sends the email to the person with a link to reset password
    mg.messages().send(data, (err, _) => {
      if (err) {
        return res.json({ error: err.message });
      }
      return res.sendStatus(200);
    });
  } catch (err) {
    res.sendStatus(401);
  }
};

// Reset password controller
export const resetPassword = async (req: any, res: any) => {
  // Input on the front-end will send username, password and the token as the request body
  const { username, password, token } = req.body;

  try {
    // find the user in the database
    const user: any = await UserModel.findOne({ username });
    console.log(user);
    // if user does not exist, throws error
    if (!user) throw new Error();
    // if token does not match the resetpasswordlink in the user, throws error
    if (token !== user.resetPasswordLink) throw new Error();

    // hashes inputed password and update user password with hashed pw, and resets the link so token cannot be reused
    const hashedPassword = await bcrypt.hash(password, 10);
    const filter = { username };
    await UserModel.findOneAndUpdate(filter, {
      password: hashedPassword,
      resetPasswordLink: "",
    });
    return res.sendStatus(200);
  } catch (err) {
    res.sendStatus(401);
  }
};

export const getUserInfo = async (req: any, res: any) => {
  // This is really straightforward, gets username, name and _id and sends it to the frontend.
  // Does not send sensitive information like password, resetpasswordlink
  try {
    const data = req.user;
    res.status(200);
    res.send({
      username: data.username,
      name: data.name,
      _id: data._id,
    });
  } catch (err) {
    res.sendStatus(403);
  }
};
