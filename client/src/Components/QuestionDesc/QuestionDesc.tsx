import React from "react";
import './styles.css';

interface Props {
  info: any,
}

export const QuestionDesc = ({info}: Props) => {

  const optionsNameArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  return (
    <div className="question-description">
      <p className='question-category'>Category: {info.category}</p>
      <p className='question-stem'>{info.stem}</p>
      {info.options.map((option: any, optionIndex: any) => {
        return (
          <div key={optionIndex} className='question-option'>
            {optionsNameArray[optionIndex]}) {option}
          </div>
        );
      })}
      <div className='correct'>Correct Answer: {optionsNameArray[info.correct]}</div>
    </div>
  );
};
