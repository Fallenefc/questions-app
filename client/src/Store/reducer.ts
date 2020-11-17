import { Question } from "../Interfaces/Questions";
import { Quiz } from "../Interfaces/Quiz";
import { User } from "../Interfaces/User";
import { Action, ADD_QUESTION_TO_QBANK, ADD_QUESTION_TO_QUIZ, ADD_QUIZ, ADD_USER, API_CALL_IS_MADE, DELETE_EXAM, DELETE_QUESTION, GET_QUESTIONS, GET_QUIZZES, RESET_API_CALL } from "./actions";

const initialState: State = {
  running: null,
  user: null,
  quizzes: [],
  questions: [],
  isApiCallMade: false
}

export interface State {
  running: Quiz | null,
  user: User | null,
  quizzes: Quiz[],
  questions: Question[],
  isApiCallMade: boolean
}

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_QUIZ:
      return ({ //first is a copy of the state, and after the comma it will be what we are going to change on the state
        ...state,
        quizzes: [...state.quizzes, action.payload]
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
    case GET_QUESTIONS:
      return ({
        ...state,
        questions: action.payload
      })
    case ADD_QUESTION_TO_QBANK:
      return ({
        ...state,
        questions: [...state.questions, action.payload]
      })
    case DELETE_QUESTION:
      // can use filter instead of splice
      const copiedQuestion = [...state.questions];
      copiedQuestion.splice(action.payload, 1)
      return ({
        ...state,
        questions: [...copiedQuestion]
      })
    case GET_QUIZZES:
      return ({
        ...state,
        quizzes: action.payload
      })
    case DELETE_EXAM:
      return ({
        ...state,
        quizzes: state.quizzes.filter((quiz) => quiz._id !== action.payload)
      })
    // case DELETE_QUESTION_FROM_EXAM:
    //   const findExam = state.quizzes.filter((quiz) => quiz._id === action.payload.examId);
    //   // this is not finished lol
    //   return ({
    //     ...state,
    //     quizzes: state.quizzes.
    //   })
    case API_CALL_IS_MADE:
      return ({
        ...state,
        isApiCallMade: action.payload
      })
    case RESET_API_CALL:
      return ({
        ...state,
        isApiCallMade: action.payload
      })
    
    default: 
      return state;
  }
}