import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { State } from '../../Store/reducer';
import { QuestionCard } from '../QuestionCard/QuestionCard';
import './styles.css'

export default function QuestionList(): ReactElement {

  const questions = useSelector((state: State) => state.questions);


  useEffect(() => {
    console.log(questions)
  })

  return (
    <div className='question-view-container'>
      {questions.map((value, index) => {
        return (
          <QuestionCard info={value} key={index} index={index} quizWindow={false}/>
        )
      })}
    </div>
  )
}
