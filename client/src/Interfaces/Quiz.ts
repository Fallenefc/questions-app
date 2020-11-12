// when you click create quiz button, you generate a new quiz in the database
// returns and id that you can use on the frontend.

import { Question } from "./Questions";

export interface QuizRaw {
  title: string,
  timed: boolean,
  ownership: string
}

export interface Quiz extends QuizRaw {
  questions: Question[],
  answers: number[],
  _id: string,
}