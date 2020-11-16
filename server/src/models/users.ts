import mongoose from 'mongoose';

export interface UserInterface {
  username: string,
  password: string,
  name: string,
  resetPasswordLink: string,
  _id: string,
  __v?: number
}

const userSchema: mongoose.Schema<UserInterface> = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  resetPasswordLink: String
})

export const UserModel = mongoose.model('User', userSchema);
