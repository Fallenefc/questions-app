import mongoose, { Schema } from 'mongoose';

interface Question {
  title: string,
  stem: string,
  category: string,
  options: string[],
  correct: number,
  ownership: string, // change this value later
  // This will (or will not be) implemented later
  done?: boolean,
  difficulty?: string
}

const questionSchema: mongoose.Schema<Question> = new mongoose.Schema({
  title: String,
  stem: String,
  category: String,
  options: [String],
  correct: Number, // This is gonna be the index

  // I am going to start it by making ownership to be the creator's email, but later will probably change it to a specific reference with mongoose
  ownership: String,
    // This will (or will not be) implemented later
  done: Boolean,
  difficulty: String,
})

export default mongoose.model('Question', questionSchema);
