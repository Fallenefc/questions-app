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
      <div className='add-modal-top'>
      <span className='add-modal-title'>Select the Quiz(es) you want to add this question to </span>
      <span onClick={handleClick} className='close-modal'>X</span>
      </div>
      {quizzes.map((quiz) => {
        return <div className='add-modal-quizoption'>
          <button onClick={() => {handleAddQuestionToQuiz(questionId, quiz._id)}} className='add-to-quiz-btn'>Add</button>
          {quiz.title} ({quiz.questions.length})
          </div>
      })}
      <button className='add-modal-close' onClick={handleClick}>Close</button>
    </div>
  )
}
