import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AlertModal from '../../Components/AlertModal/AlertModal';
import { QuestionCard } from '../../Components/QuestionCard/QuestionCard';
import { apiDeleteAnExam, getFullQuiz, submitAnExamAsATeacher } from '../../Services/ApiClient';
import { deleteAnExam } from '../../Store/actions';
import './styles.css'

export default function SingleQuizPage(): ReactElement {

  interface Params {
    quizId: string
  }

  const dispatch = useDispatch();
  const history = useHistory();

  const [fullQuiz, setFullQuiz] = useState<any>(null)
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const params: Params = useParams();

  const [alertModal, setAlertModal] = useState(false);
  const handleAlertModal = () => {
    setAlertModal(false);
  }


  useEffect(() => {
    getFullQuiz(params.quizId).then((response: any) => {
      console.log(response.data);
      setFullQuiz(response.data);
      if (response.data.submitted === true) setSubmittedQuiz(true);
    })
  }, [])

  const deleteQuiz = () => {
    apiDeleteAnExam(params.quizId).then(() => {
      dispatch(deleteAnExam(params.quizId));
      history.push({pathname: '/viewQuizzes'})
    })
  }

  const submitQuiz = async () => {
    const response = submitAnExamAsATeacher(fullQuiz._id);
    // use Redux to change the quiz state...
    console.log(response);
    history.push({pathname: '/viewQuizzes'});
  }

  const textToClipboard = () => {
    setAlertModal(true);
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = `http://localhost:3000/studentExam/${fullQuiz.hashedId}`;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  return (
    <div className='single-quiz-container'>
      {alertModal ? <AlertModal text='Copied to Clipboard!' handleAlertModal={handleAlertModal}/> : null}
      <div className='quiz-questions'>
      {fullQuiz ? <div className='quiz-title'>Title: {fullQuiz.title}</div> : <div>Loading</div>}
      {fullQuiz ? fullQuiz.questions.map((question: any, index: any) => {
        return (
          <div>
            <QuestionCard info={question} index={index} quizWindow={true} />
          </div>
        )
      }) : null}
      <button onClick={deleteQuiz} className='delete-btn'>Delete Quiz</button>
      {submittedQuiz ? <button className='submit-btn' onClick={textToClipboard}>Copy Quiz Link</button> : <button className='submit-btn' onClick={submitQuiz}>Submit Quiz</button>}
      </div>
    </div>
  )
}
