import React, { ReactElement, useEffect, useState } from 'react'
import { QuestionsInterface } from '../../Interfaces/Questions'

interface Props {
  question: QuestionsInterface | any;
  toggleAnswer: any;
  index: any
}


function Question({question, toggleAnswer, index}: Props): ReactElement {

  // Is this state really necessary? Gonna double check when my brain is not fried
  const [selected, setSelected] = useState(null);

  const handleChange = (e: any) => {
    setSelected(e.target.value);
  }

  const handleClick = (id: string, index:number) => {
    if (selected == question.correct) { 
      toggleAnswer(id, index, "true")
    }
    else {
      toggleAnswer(id, index, "false")
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
      <button onClick={() => handleClick(question._id, index)}>Test</button>
      {question.done !== null ? <div className='answer-comment'>
        {question.done === true ? <p>Correct Answer!</p> : <p>Wrong Answer, try again</p>}
      </div> : null}
    </div>
  )
}

export default Question
