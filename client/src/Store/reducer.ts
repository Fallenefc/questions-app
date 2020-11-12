import { Question } from "../Interfaces/Questions";
import { Quiz } from "../Interfaces/Quiz";
import { User } from "../Interfaces/User";
import { Action, ADD_QUESTION_TO_QUIZ, ADD_QUIZ, ADD_USER } from "./actions";

const initialState: State = {
  running: null,
  user: null,
  quizzes: [],
  questions: []
}

export interface State {
  running: Quiz | null,
  user: User | null,
  quizzes: Quiz[],
  questions: Question[]
}

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_QUIZ:
      return ({ //first is a copy of the state, and after the comma it will be what we are going to change on the state
        ...state,
        quizzes: [...state.quizzes, action.payload.quiz]
      });
    case ADD_QUESTION_TO_QUIZ:
      return ({
        ...state,
        quizzes: state.quizzes.map((quiz) => {
          if (quiz._id === action.payload.quizId) {
            return {...quiz, questions: [...quiz.questions, action.payload.question]};
          }
          return quiz;
        })
      })
    case ADD_USER:
      return ({
        ...state,
        user: action.payload
      })
    default: 
      return state;
  }
}