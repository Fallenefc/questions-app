import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddQuestion from "../../Pages/AddQuestion/AddQuestion";
import { deleteQuestion } from "../../Services/ApiClient";
import { deleteQuestionFromQuestionBank } from "../../Store/actions";
import { State } from "../../Store/reducer";
import AddQuestionModal from "../AddQuestionModal/AddQuestionModal";
import { QuestionDesc } from "../QuestionDesc/QuestionDesc";
import "./styles.css";

interface Props {
  info: any;
  index: number;
}

export const QuestionCard = ({ info, index }: Props) => {
  const [toggled, setToggled] = useState(false);
  const [clickedModal, setClickedModal] = useState(false);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setToggled((toggle) => !toggle);
  };

  const handleDelete = async (questionId: string, questionArrayIndex: number) => {
    await deleteQuestion(questionId);
    // change state...
    dispatch(deleteQuestionFromQuestionBank(questionArrayIndex));
  }

  // const handleAddToQuiz = async () => {
  //   // open a model to select which quiz you want to open?
  //   console.log(quizzes);
  // }

  const toggleModal = () => {
    setClickedModal((clickedModal) => !clickedModal);
  }

  return (
    <div className="question-title" key={index}>
      {/* <AddQuestionModal /> */}
            {clickedModal ? <AddQuestionModal handleClick={toggleModal} questionId={info._id}/> : null}
      <div className="title-icons">
        <span className="title-dropdown">
        <span className='add-to-quiz' onClick={toggleModal}>
          <i className="fa fa-plus"></i>
          </span>
          <span  onClick={handleToggle}>
          <i className="fa fa-caret-down"></i>
          <span>{info.title}</span>
          </span>
        </span>
        <span className="edit-delete">
          <i className="fa fa-edit"></i> <i className="fa fa-trash" onClick={() => handleDelete(info._id, index)}></i>
        </span>
      </div>
      {toggled ? <QuestionDesc info={info} /> : null}
    </div>
  );
};
