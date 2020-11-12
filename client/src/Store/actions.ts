import { Question } from "../Interfaces/Questions";
import { Quiz } from "../Interfaces/Quiz";
import { User } from "../Interfaces/User";
// import { QuizRaw } from "../Interfaces/Quiz";

export const CREATE_QUIZ = 'CREATE_QUIZ'; // add extra layer of guarding against typos
export const ADD_QUESTION_TO_QUIZ = 'ADD_QUESTION_TO_QUIZ';
export const ADD_QUIZ = 'ADD_QUIZ';
export const ADD_USER = 'ADD_USER';
export const GET_QUESTIONS = 'GET_QUESTIONS'

/**
 * {
 *   type: enum of actions
 *   payload: any
 * }
 */

export interface Action {
  type: string,
  payload: any
}

export const addQuestionToQuiz = (quizId: string, question: Question): Action => ({
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