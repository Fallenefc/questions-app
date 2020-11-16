import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { State } from "../../Store/reducer";
import "./styles.css";

export default function Dashboard(): ReactElement {
  
  const user = useSelector((state: State) => state.user);

  return (
        <div className="dashboard-container">
          <span>
            Welcome, <span id='special'>{user ? user.name : null}</span>! To get started, select one of the options on the side.
          </span>
          <span>
          <span id='special'>View Questions</span> to view all the questions that you created.
            You can also edit, delete or add those questions to a quiz that you have created.
          </span>
          <span>
          <span id='special'>Add question</span> will add a question to you personal question bank
          </span>
          <span>
          <span id='special'>View Quizzes</span> to view all the quizzes that you have created
          </span>
          <span>
          <span id='special'>Create a Quiz</span> will generate a new empty quiz for you to add questions on!
          </span>
        </div>
  );
}
