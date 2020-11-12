import React, { useState } from "react";
import { QuestionDesc } from "../QuestionDesc/QuestionDesc";
import './styles.css'

interface Props {
  info: any,
  index: number
}

export const QuestionCard = ({info, index}: Props) => {

  const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(toggle => !toggle);
  }

  return (
    <div className="question-title" key={index} onClick={handleToggle}>
      <div className='title-icons'>
      <i className="fa fa-caret-down"></i>
        <span>{info.title}</span> <i className="fa fa-edit"></i> <i className="fa fa-trash"></i> 
      </div>
       {toggled ? <QuestionDesc info={info}/> : null}
    </div>
  );
};
