import mongoose from 'mongoose';

export interface UserInterface {
  username: string,
  password: string,
  name: string,
  accessLevel: number,
  resetPasswordLink: string
}

const userSchema: mongoose.Schema<UserInterface> = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  accessLevel: Number,
  resetPasswordLink: String
})

export const UserModel = mongoose.model('User', userSchema);
