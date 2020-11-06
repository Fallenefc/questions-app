import mongoose from 'mongoose';

export interface UserInterface {
  username: string,
  password: string
}

const userSchema: mongoose.Schema<UserInterface> = new mongoose.Schema({
  username: String,
  password: String
})

export const UserModel = mongoose.model('User', userSchema);
