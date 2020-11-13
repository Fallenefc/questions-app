import React, { ReactElement, useEffect, useState } from 'react'

interface Props {
  quiz: any,
  title: string
}

export default function QuizCard({quiz, title}: Props): ReactElement {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    quiz.questions.forEach((id: string) => {
      // make a get single question API request
    })
  })

  return (
    <div>
      {title}
      <br></br>
      {quiz._id}
    </div>
  )
}
