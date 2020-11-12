import React, { useState } from "react";
import { QuestionDesc } from "../QuestionDesc/QuestionDesc";
import "./styles.css";

interface Props {
  info: any;
  index: number;
}

export const QuestionCard = ({ info, index }: Props) => {
  const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled((toggle) => !toggle);
  };

  return (
    <div className="question-title" key={index}>
      <div className="title-icons">
        <span className="title-dropdown" onClick={handleToggle}>
          <i className="fa fa-caret-down"></i>
          <span>{info.title}</span>
        </span>
        <span className="edit-delete">
          <i className="fa fa-edit"></i> <i className="fa fa-trash"></i>
        </span>
      </div>
      {toggled ? <QuestionDesc info={info} /> : null}
    </div>
  );
};
