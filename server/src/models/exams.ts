import mongoose from 'mongoose';

interface SingleExam {
  studentId: string,
  studentEmail: string,
  score: number
}

export interface ExamRaw {
  title: string,
  questions: string[], // array of question ids
  ownership: string, // teacher ID
  doneBy: SingleExam[],
  submitted: boolean,
  hashedId: string | null
}

export interface Exam {
  _id: string,
  title: string,
  // timer?: number, // will be implemented on a future date
  questions: string[],
  ownership: string, // Teacher ID
  doneBy: SingleExam[], // this will show an array of students who finished the exam, and their score
  // availableTo?: string[] // will be implemented in the future. This will be the students in which the exam is available to
  submitted: boolean,
  hashedId?: string
}

const examSchema: mongoose.Schema<Exam> = new mongoose.Schema({
  title: String,
  // timer: Number,
  // questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}], implement this after achieving MVP
  questions: [String],
  ownership: String,
  doneBy: [{
    studentId: String,
    studentEmail: String,
    score: Number
  }],
  submitted: Boolean,
  hashedId: String
})

export default mongoose.model('Exam', examSchema);
