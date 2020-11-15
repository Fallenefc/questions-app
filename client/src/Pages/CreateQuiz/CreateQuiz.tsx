import React, { ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createExam } from '../../Services/ApiClient';
import { addQuiz } from '../../Store/actions';
import './styles.css'

export default function CreateQuiz(): ReactElement {
  
  const [quizTitle, setQuizTitle] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleChange = (e: any) => {
    setQuizTitle(e.target.value)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (quizTitle === '') {
      alert('Quiz name cannot be empty');
      return;
    }
    const newQuiz = await createExam(quizTitle);
    dispatch(addQuiz(newQuiz));
    history.push({pathname: '/viewQuizzes'})
  }

  return (
    <div className='createquiz-container'>
      <form onSubmit={handleSubmit}>
        <div className='addquiz-text'>Set a Quiz name</div>
        <input type='text' placeholder='Quiz name' onChange={handleChange} value={quizTitle}></input>
        <button type='submit' className='addquiz-btn'>Submit</button>
      </form>
    </div>
  )
}
