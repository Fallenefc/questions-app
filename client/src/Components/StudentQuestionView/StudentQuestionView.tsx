import React, { ReactElement } from 'react'

interface Props {
  _id: string,
  stem: string,
  options: string[]
}

export default function StudentQuestionView({_id, stem, options}: Props): ReactElement {
  return (
    <div className='student-question-container'>
      <div className='student-stem'>
        Question Stem
      </div>
      <div className='student-choice'>
        A. Choice
      </div>
      <button>Submit</button>
      <button>Previous Question</button><button>Next Question</button>
    </div>
  )
}
