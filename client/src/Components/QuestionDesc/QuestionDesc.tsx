import React from "react";

interface Props {
  info: any
}

export const QuestionDesc = ({info}: Props) => {
  return (
    <div className="question-description">
      <p>Category: {info.category}</p>
      <p>{info.stem}</p>
      {info.options.map((option: any, optionIndex: any) => {
        return (
          <div key={optionIndex}>
            <input type="radio"></input>
            {option}
          </div>
        );
      })}
    </div>
  );
};
