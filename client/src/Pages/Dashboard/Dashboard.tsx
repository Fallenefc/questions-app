import React, { ReactElement, useEffect, useState } from "react";
import Question from "../../Components/Question/Question";
import { QuestionsInterface } from "../../Interfaces/Questions";
import "./styles.css";

interface Props {
  questionList: any; // Fix any type later!
  toggleAnswer: any;
  changeQuestion: any;
  current: any;
}

export default function Dashboard({ questionList, toggleAnswer, changeQuestion, current }: Props): ReactElement {

  const handleClick = (index: number) => {
    changeQuestion(index);
  }

  return (
    <div className="dashboard-container">
      <div className="side-question-list">
        <ul>
          {questionList ? (
            questionList.map((question: QuestionsInterface, index: number) => {
              return (
                <li key={question._id} className={current === index ? 'list-element chosen' : 'list-element'}>
                  <div onClick={() => handleClick(index)}>Question {index}</div>
                  <div className='done' id={question.done === null ? 'null' : question.done === true ? 'yes' : 'no'}></div>
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
          <Question question={questionList[current]} toggleAnswer={toggleAnswer} index={current}/>
        : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
