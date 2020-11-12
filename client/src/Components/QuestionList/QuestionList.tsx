import React, { ReactElement } from 'react'
import { QuestionCard } from '../QuestionCard/QuestionCard';
import './styles.css'

export default function QuestionList(): ReactElement {

  const mockQuestions = [
    {
    title: 'Question 1',
    stem: 'Question Description Number 1',
    category: "1",
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  },
  {
    title: 'Question 2',
    stem: 'Question Description Number 2',
    category: "2",
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  },
  {
    title: 'Question 3',
    stem: 'Question Description Number 3',
    category: "3",
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  },
  {
    title: 'Question 4',
    stem: 'Question Description Number 4',
    category: "4",
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  },
  {
    title: 'Question 5',
    stem: 'Question Description Number 5',
    category: "5",
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  },
  ]

  const toggleDisplay = (event: any) => {
    console.log(event.target);
    event.target.style.display = 'none';

  }

  return (
    <div className='question-view-container'>
      {mockQuestions.map((value, index) => {
        return (
          <QuestionCard info={value} key={index} index={index}/>
        )
      })}
    </div>
  )
}
