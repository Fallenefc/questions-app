import mongoose from 'mongoose';

interface SingleExam {
  student: string,
  score: number
}

export interface ExamRaw {
  title: string,
  options: string[], // array of question ids
  ownership: string, // teacher ID
  doneBy: SingleExam[],
}

export interface Exam {
  _id: string,
  title: string,
  // timer?: number, // will be implemented on a future date
  options: string[],
  ownership: string, // Teacher ID
  doneBy: SingleExam[], // this will show an array of students who finished the exam, and their score
  // availableTo?: string[] // will be implemented in the future. This will be the students in which the exam is available to
}

const examSchema: mongoose.Schema<Exam> = new mongoose.Schema({
  title: String,
  // timer: Number,
  options: [String],
  ownership: String,
  // not sure if this works tbh
  doneBy: [{
    student: String,
    score: Number
  }],
})

export default mongoose.model('Exam', examSchema);
