import React, { ReactElement, useState } from 'react'
import { QuestionsInterface } from '../../Interfaces/Questions'

interface Props {
  question: QuestionsInterface | any;
}

interface Answer {
  answer: boolean;
}

function Question({question}: Props): ReactElement {

  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState<Answer | null>(null);

  const handleChange = (e: any) => {
    setSelected(e.target.value);
  }

  const handleClick = () => {
    if (selected == question.correct) { 
      console.log('This is the correct answer!')
      setAnswered({answer: true})
    }
    else {
      console.log('youre dumb ffs')
      setAnswered({answer: false})
    }
  }

  return (
    <div>
      <div>{question.stem ? question.stem : null}</div>
      <ul>
        {question.options.map((option: QuestionsInterface, index:number) => {
          return <li key={index}><input type='radio' name='question' value={index} onClick={handleChange}></input>{option}</li>
        })}
      </ul>
      <button onClick={handleClick}>Test</button>
      {answered ? <div className='answer-comment'>
        {answered.answer === true ? <p>Correct Answer!</p> : <p>Wrong Answer, try again</p>}
      </div> : null}
    </div>
  )
}

export default Question
