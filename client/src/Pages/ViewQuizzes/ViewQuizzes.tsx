import React, { ReactElement, useEffect } from 'react'
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
        return <div><QuizCard quiz={quiz} key={index} title={quiz.title}/><span>Questions total: {quiz.questions.length}</span></div>
      })}
    </div>
  )
}
