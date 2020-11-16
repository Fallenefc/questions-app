import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';
import './styles.css'

interface Props {
  quiz: any,
}

export default function QuizCard({quiz}: Props): ReactElement {

  const history = useHistory();

  const handleClick = (id: string) => {
    // redirect to page
    history.push({pathname: `/quiz/${id}`})
  }

  return (
    <div className='padding' onClick={() => handleClick(quiz._id)}>
      <div className='quizcard-title'>
        {quiz.title}
      </div>
      <div className='total-questions'>
       Total Questions: {quiz.questions.length}
      </div>
        {quiz.submitted ? <div className='submitted'>Quiz ID: {quiz.hashedId}</div> : <div className='submitted'>Not Submitted</div>}
    </div>
  )
}
