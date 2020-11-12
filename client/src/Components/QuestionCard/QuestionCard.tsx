import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../Services/ApiClient";
import { deleteQuestionFromQuestionBank } from "../../Store/actions";
import { QuestionDesc } from "../QuestionDesc/QuestionDesc";
import "./styles.css";

interface Props {
  info: any;
  index: number;
}

export const QuestionCard = ({ info, index }: Props) => {
  const [toggled, setToggled] = useState(false);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setToggled((toggle) => !toggle);
  };

  const handleDelete = async (questionId: string, questionArrayIndex: number) => {
    await deleteQuestion(questionId);
    // change state...
    dispatch(deleteQuestionFromQuestionBank(questionArrayIndex));
  }

  return (
    <div className="question-title" key={index}>
      <div className="title-icons">
        <span className="title-dropdown" onClick={handleToggle}>
          <i className="fa fa-caret-down"></i>
          <span>{info.title}</span>
        </span>
        <span className="edit-delete">
          <i className="fa fa-edit"></i> <i className="fa fa-trash" onClick={() => handleDelete(info._id, index)}></i>
        </span>
      </div>
      {toggled ? <QuestionDesc info={info} /> : null}
    </div>
  );
};
