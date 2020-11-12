import React, { ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../Components/Header/Header";
import NavBar from "../../Components/NavBar/NavBar";
import QuestionList from "../../Components/QuestionList/QuestionList";
import { State } from "../../Store/reducer";
import "./styles.css";

export default function Dashboard(): ReactElement {
  const user = useSelector((state: State) => state.user);

  useEffect(() => {
    console.log(user);
  });

  return (
        <div className="dashboard-container">
        </div>
  );
}
