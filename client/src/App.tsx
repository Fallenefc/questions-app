import React, { useEffect, useState } from "react";
// import "./App.css";
import { getInfo, getApiQuestions, getApiQuizzes } from "./Services/ApiClient";
import Routes from "./Pages/Routes";
import { User } from "./Interfaces/User";
import { useDispatch } from "react-redux";
import { addUser, getQuestions, getQuizzes } from "./Store/actions";
import "./Assets/styles/global.css";

function App() {
  const [userInfo, setUserInfo] = useState<User | null>(null); // does not need both states to be fair

  const dispatch = useDispatch();

  useEffect(() => {
    getInfo()
      .then((response): void => {
        if (response) {
          // Sets status as logged in
          // Stores user information in Redux store
          dispatch(addUser(response.data));
          setUserInfo(response.data);
          // gets questions and stores the questions in the Redux store
          getApiQuestions().then((response: any) => {
            dispatch(getQuestions(response.data));
          });
          // gets quizzes, stores data in the Redux store
          getApiQuizzes().then((response: any) => {
            console.log(response.data);
            dispatch(getQuizzes(response.data));
          });
        }
      })
      .catch((err) => {
        console.log("Please log in first");
      });
  }, []);

  return (
    <>
      <Routes userInfo={userInfo} />
    </>
  );
}

export default App;
