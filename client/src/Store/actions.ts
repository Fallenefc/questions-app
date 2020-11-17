import { Question } from "../Interfaces/Questions";
import { Quiz } from "../Interfaces/Quiz";
import { User } from "../Interfaces/User";

export const ADD_QUESTION_TO_QUIZ = 'ADD_QUESTION_TO_QUIZ';
export const ADD_QUESTION_TO_QBANK = 'ADD_QUESTION_TO_QBANK';
export const ADD_QUIZ = 'ADD_QUIZ';
export const ADD_USER = 'ADD_USER';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const GET_QUIZZES = 'GET_QUIZZES';
export const DELETE_EXAM = 'DELETE_EXAM';
export const DELETE_QUESTION_FROM_EXAM = 'DELETE_QUESTION_FROM_EXAM';
export const API_CALL_IS_MADE = 'API_CALL_IS_MADE';
export const RESET_API_CALL = 'RESET_API_CALL';

export interface Action {
  type: string,
  payload: any
}

export const addQuestionToQuiz = (quizId: string, question: string): Action => ({
  type: ADD_QUESTION_TO_QUIZ,
  payload: { // create obj when you multiple 
    quizId,
    question,
  },
});

export const addQuiz = (quiz: Quiz): Action => ({
  type: ADD_QUIZ,
  payload: quiz
})

export const addUser = (user: User | null): Action => ({
  type: ADD_USER,
  payload: user
})

export const getQuestions = (questions: Question[]): Action => ({
  type: GET_QUESTIONS,
  payload: questions
})

export const addQuestionToQuestionBank = (question: any): Action => ({
  type: ADD_QUESTION_TO_QBANK,
  payload: question
})

export const deleteQuestionFromQuestionBank = (questionIndex: number): Action => ({
  type: DELETE_QUESTION,
  payload: questionIndex
})

export const getQuizzes = (quizzes: any): Action => ({
  type: GET_QUIZZES,
  payload: quizzes
})

export const deleteAnExam = (examId: string): Action => ({
  type: DELETE_EXAM,
  payload: examId
})

export const deleteQuestionFromExam = (examId: string, questionId: string): Action => ({
  type: DELETE_QUESTION_FROM_EXAM,
  payload: {
    examId,
    questionId
  }
})

export const apiCallIsMade = (): Action => ({
  type: API_CALL_IS_MADE,
  payload: true
})

export const resetApiCall = (): Action => ({
  type: RESET_API_CALL,
  payload: false
})