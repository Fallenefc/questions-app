import React, { ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import QuizCard from '../../Components/QuizCard/QuizCard';
import { State } from '../../Store/reducer';
import './styles.css'

export default function ViewQuizzes(): ReactElement {

  const quizzes = useSelector((state: State) => state.quizzes);

  useEffect(() => {
    console.log(quizzes);
  })

  return (
    <div className='quiz-view-container'>
      {quizzes.map((quiz: any, index) => {
        return <div className='quiz-card'><QuizCard quiz={quiz} key={index}/></div>
      })}
    </div>
  )
}
