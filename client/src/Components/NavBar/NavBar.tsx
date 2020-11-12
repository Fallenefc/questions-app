import React from 'react'
import { useHistory } from 'react-router-dom'
import './styles.css'

const NavBar = () => {

  const history = useHistory();

  const handleClick = (event: any) => {
    history.push({pathname: `${event.target.name}`})
  }

  return (
    <div className='left-nav-bar'>
          <button onClick={handleClick} name="viewQuestions">View Questions</button>
          <button onClick={handleClick} name="addQuestion">Add Question</button>
          <button>Create a Quiz</button>
          <button>View Quizzes</button>
    </div>
  )
}

export default NavBar
