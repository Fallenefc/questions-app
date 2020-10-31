import React, { ReactElement } from 'react'
import { QuestionsInterface } from '../../Interfaces/Questions'

interface Props {
  question: QuestionsInterface;
}

function Question({question}: Props): ReactElement {
  return (
    <div>
      <div>{question.stem}</div>
      <ul>
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
        <li>Option 4</li>
        <li>Option 5</li>
      </ul>
    </div>
  )
}

export default Question
