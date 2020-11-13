import React, { ReactElement, useEffect, useState } from 'react'
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
      {quiz.title}
      <br></br>
      Total Questions: {quiz.questions.length}
      <br></br>
      Submitted: false
    </div>
  )
}
