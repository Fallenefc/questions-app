import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { QuestionCard } from '../../Components/QuestionCard/QuestionCard';
import { apiDeleteAnExam, getFullQuiz } from '../../Services/ApiClient';
import { deleteAnExam } from '../../Store/actions';
import './styles.css'

export default function SingleQuizPage(): ReactElement {

  interface Params {
    quizId: string
  }

  const dispatch = useDispatch();
  const history = useHistory();

  const [fullQuiz, setFullQuiz] = useState<any>(null)
  const params: Params = useParams();

  useEffect(() => {
    getFullQuiz(params.quizId).then((response: any) => {
      console.log(response.data);
      setFullQuiz(response.data);
    })
  }, [])

  const deleteQuiz = () => {
    apiDeleteAnExam(params.quizId).then(() => {
      dispatch(deleteAnExam(params.quizId));
      history.push({pathname: '/viewQuizzes'})
    })
  }

  return (
    <div className='single-quiz-container'>
      {fullQuiz ? <div className='quiz-title'>Title: {fullQuiz.title}</div> : <div>Loading</div>}
      {fullQuiz ? fullQuiz.questions.map((question: any, index: any) => {
        return (
          <div>
            <QuestionCard info={question} index={index} quizWindow={true} />
          </div>
        )
      }) : null}
      <button onClick={deleteQuiz} className='delete-btn'>Delete Quiz</button>
      <button className='submit-btn'>Submit Quiz</button>
    </div>
  )
}
