import React, { ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createExam } from '../../Services/ApiClient';
import { addQuiz } from '../../Store/actions';

export default function CreateQuiz(): ReactElement {
  
  const [quizTitle, setQuizTitle] = useState('');
  const dispatch = useDispatch();
  
  const handleChange = (e: any) => {
    setQuizTitle(e.target.value)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newQuiz = await createExam(quizTitle);
    dispatch(addQuiz(newQuiz));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='quiz name' onChange={handleChange} value={quizTitle}></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
