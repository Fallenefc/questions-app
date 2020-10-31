import mongoose from 'mongoose';

interface Question {
  stem: string,
  options: string[],
  correct: number,
  category: string
}

const questionSchema: mongoose.Schema<Question> = new mongoose.Schema({
  stem: String,
  options: [String],
  correct: Number, // This is gonna be the index
  category: String,
})

export default mongoose.model('Question', questionSchema);
