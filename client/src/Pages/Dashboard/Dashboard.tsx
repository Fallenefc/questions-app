import React, { ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../Store/reducer";
import "./styles.css";

export default function Dashboard(): ReactElement {
  const user = useSelector((state: State) => state.user);
  const questions = useSelector((state: State) => state.questions);

  useEffect(() => {
    console.log(user);
    console.log(questions);
  });

  return (
        <div className="dashboard-container">
        </div>
  );
}
