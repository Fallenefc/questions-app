import React from "react";

interface Props {
  info: any
}

export const QuestionDesc = ({info}: Props) => {

  const optionsNameArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  return (
    <div className="question-description">
      <p>Category: {info.category}</p>
      <p>{info.stem}</p>
      {info.options.map((option: any, optionIndex: any) => {
        return (
          <div key={optionIndex}>
            {optionsNameArray[optionIndex]}) {option}
          </div>
        );
      })}
    </div>
  );
};
