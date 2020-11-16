import mongoose, { Schema } from 'mongoose';

export interface QuestionRaw {
  title: string,
  stem: string,
  category: string,
  options: string[],
  correct: number,
  ownership: string, // change this value later
  // This will (or will not be) implemented later
  done?: boolean,
  difficulty?: string,
  uuid: string
}

export interface Question extends QuestionRaw {
  _id: string,
}

const questionSchema: mongoose.Schema<QuestionRaw> = new mongoose.Schema({
  title: String,
  stem: String,
  category: String,
  options: [String],
  correct: Number,
  ownership: String,
  done: Boolean,
  difficulty: String,
  uuid: String,
})

export default mongoose.model('Question', questionSchema);
