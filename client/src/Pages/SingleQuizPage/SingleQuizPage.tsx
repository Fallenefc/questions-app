import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { QuestionCard } from '../../Components/QuestionCard/QuestionCard';
import { getFullQuiz } from '../../Services/ApiClient';
import './styles.css'

export default function SingleQuizPage(): ReactElement {

  interface Params {
    quizId: string
  }

  const [fullQuiz, setFullQuiz] = useState<any>(null)
  const params: Params = useParams();

  useEffect(() => {
    getFullQuiz(params.quizId).then((response: any) => {
      console.log(response.data);
      setFullQuiz(response.data);
    })
  }, [])

  return (
    <div className='single-quiz-container'>
      {fullQuiz ? fullQuiz.title : <div>Loading</div>}
      {fullQuiz ? fullQuiz.questions.map((question: any, index: any) => {
        return (
          <div>
            <QuestionCard info={question} index={index} quizWindow={true} />
          </div>
        )
      }) : null}
            <button>Submit Quiz</button>
    </div>
  )
}
