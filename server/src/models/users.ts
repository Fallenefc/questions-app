import mongoose from 'mongoose';

export interface UserInterface {
  username: string,
  password: string,
  name: string,
  accessLevel: number
}

const userSchema: mongoose.Schema<UserInterface> = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  accessLevel: Number
})

export const UserModel = mongoose.model('User', userSchema);
