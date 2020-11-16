import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import StudentQuestionCard from '../../Components/StudentQuestionCard/StudentQuestionCard';
import { apiGetFullExamAsAStudent, submitAnExamAsAStudent } from '../../Services/ApiClient';
import './styles.css'

export default function StudentExam(): ReactElement {

  interface Params {
    examId: string,
  }

  const params: Params = useParams();

  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [questionsIds, setQuestionsIds] = useState<any>([]);

  useEffect(() => {
    apiGetFullExamAsAStudent(params.examId).then((response: any) => {
      setExam(response);
      // console.log(response);
      response.options.forEach((value: any) => {
        answers[value._id] = null;
        setQuestionsIds((array: any) => [...array, value._id])
      })
    })
  }, [])

  const handleChoice = (questionId: string, choice: number) => {
    const answersCopy = {...answers};
    answersCopy[questionId] = choice;
    console.log(answersCopy)
    setAnswers(answersCopy);
  }


  const handleExamSubmission = async () => {
    const response: any = await submitAnExamAsAStudent(exam.hashedId, answers, questionsIds);
    console.log(response.data.score);
  }

  return (
    <div className='student-exam-container'>
      <span className='student-exam-title'>{exam ? exam.title : null}</span>
      {exam ? exam.options.map((option: any, index: number) => {
        return <StudentQuestionCard stem={option.stem} options={option.options} index={index} handleChoice={handleChoice} id={option._id}/>
      }) : <div>Loading Exam...</div>}
      <button className='submit-exam-button' onClick={handleExamSubmission}>Submit Your Exam</button>
    </div>
  )
}
