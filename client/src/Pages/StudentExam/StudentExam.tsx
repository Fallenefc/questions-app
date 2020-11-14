import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { apiGetFullExamAsAStudent } from '../../Services/ApiClient';

export default function StudentExam(): ReactElement {

  interface Params {
    examId: string,
  }

  const params: Params = useParams();

  const [exam, setExam] = useState<any>(null);

  useEffect(() => {
    apiGetFullExamAsAStudent(params.examId).then((response: any) => {
      console.log(params.examId)
      console.log(response);
      setExam(response);
    })
  }, [])

  return (
    <div>
      {exam ? exam.options.map((option: any) => {
        return <div>
                {option.stem}
                {option.options.map((opt: any) => {
                  return <div>{opt}</div>
                })}
              </div>
      }) : <div>Loading Exam...</div>}
    </div>
  )
}
