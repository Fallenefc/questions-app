import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import StudentQuestionCard from '../../Components/StudentQuestionCard/StudentQuestionCard';
import { apiGetFullExamAsAStudent } from '../../Services/ApiClient';
import './styles.css'

export default function StudentExam(): ReactElement {

  interface Params {
    examId: string,
  }

  const params: Params = useParams();

  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});

  useEffect(() => {
    apiGetFullExamAsAStudent(params.examId).then((response: any) => {
      setExam(response);
      // console.log(response);
      response.options.forEach((value: any) => {
        answers[value._id] = null;
      })
    })
  }, [])

  const handleChoice = (questionId: string, choice: number) => {
    const answersCopy = {...answers};
    answersCopy[questionId] = choice;
    console.log(answersCopy)
    setAnswers(answersCopy);
  }

  return (
    <div className='student-exam-container'>
      <span className='student-exam-title'>{exam ? exam.title : null}</span>
      {exam ? exam.options.map((option: any, index: number) => {
        return <StudentQuestionCard stem={option.stem} options={option.options} index={index} handleChoice={handleChoice} id={option._id}/>
      }) : <div>Loading Exam...</div>}
    </div>
  )
}
