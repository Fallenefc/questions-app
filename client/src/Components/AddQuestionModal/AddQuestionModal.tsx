import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { apiAddQuestionToQuiz } from '../../Services/ApiClient';
import { addQuestionToQuiz } from '../../Store/actions';
import { State } from '../../Store/reducer';
import './styles.css'

interface Props {
  handleClick: any;
  questionId: string
}

export default function AddQuestionModal({handleClick, questionId}: Props): ReactElement {

  const quizzes = useSelector((state: State) => state.quizzes);
  const dispatch = useDispatch();

  const handleAddQuestionToQuiz = (questionId: string, quizId: string) => {
    apiAddQuestionToQuiz(questionId, quizId);
    dispatch(addQuestionToQuiz(quizId, questionId));
  }

  return (
    <div className='modal'>
      Modal window goes brrrrrrrrrrrrrrr
      {quizzes.map((quiz) => {
        return <div>
          <button onClick={() => {handleAddQuestionToQuiz(questionId, quiz._id)}}>Add</button>
          {quiz.title}
          </div>
      })}
      <span onClick={handleClick}>X</span>
    </div>
  )
}
