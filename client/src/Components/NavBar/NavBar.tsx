import React from 'react'
import { useHistory } from 'react-router-dom'
import './styles.css'

const NavBar = () => {

  const history = useHistory();

  const handleClick = (event: any) => {
    history.push({pathname: `/${event.target.name}`})
  }

  return (
    <div className='left-nav-bar'>
          <div className='student-teacher-choices'>Teacher</div>
          <button onClick={handleClick} name="viewQuestions">View Questions</button>
          <button onClick={handleClick} name="addQuestion">Add Question</button>
          <button onClick={handleClick} name='viewQuizzes'>View Quizzes</button>
          <button onClick={handleClick} name='createQuiz'>Create a Quiz</button>
          <div className='student-teacher-choices'>Student</div>
          <button id='disabled'>Add a Quiz</button>
          <button id='disabled'>Available Quizzes</button>
    </div>
  )
}

export default NavBar
