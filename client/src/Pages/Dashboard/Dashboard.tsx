import React, { ReactElement, useEffect, useState } from "react";
import Question from "../../Components/Question/Question";
import { QuestionsInterface } from "../../Interfaces/Questions";
import "./styles.css";

interface Props {
  questionList: any; // Fix any type later!
}

export default function Dashboard({ questionList }: Props): ReactElement {

  const [currentQuestion, setCurrentQuestion] = useState(3)

  useEffect(() => {
    console.log(questionList);
  });

  const handleClick = (index: number) => {
    setCurrentQuestion(index);
  }

  return (
    <div className="dashboard-container">
      <div className="side-question-list">
        <ul>
          {questionList ? (
            questionList.map((question: QuestionsInterface, index: number) => {
              return (
                <li key={question._id} className='list-element'>
                  <div onClick={() => handleClick(index)}>Question {index}</div>
                  <div className='done'></div>
                </li>
              );
            })
          ) : (
            <div>Loading</div>
          )}
        </ul>
      </div>
      <div className="question">
        {questionList ? 
          <Question question={questionList[currentQuestion]} />
        : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
