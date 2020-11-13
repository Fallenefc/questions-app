import React, { useEffect, useState } from "react";
import "./App.css";
import {getInfo, getApiQuestions, getApiQuizzes} from "./Services/ApiClient";
import Routes from "./Pages/Routes";
import { User } from "./Interfaces/User";
import {useDispatch} from 'react-redux';
import {addUser, getQuestions, getQuizzes} from './Store/actions';

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(null); // does not need both states to be fair

  const dispatch = useDispatch();

  // Makes the API call when it loads, and set loggedIn and userInfo states

  // BUG FIX: breaks when logs out! Apparently it's fixed, didnt chain the API requests properly!

  useEffect(() => {
    getInfo().then((response): void => {
      if (response) {
        // Sets status as logged in
        // Stores user information in Redux store
        setLoggedIn(true);
        dispatch(addUser(response.data));
        // gets questions and stores the questions in the Redux store
        getApiQuestions().then((response: any) => {
          dispatch(getQuestions(response.data));
        })
        // gets quizzes, stores data in the Redux store
        getApiQuizzes().then((response: any) => {
          console.log(response.data);
          dispatch(getQuizzes(response.data));
        })
      }
    }).catch(err => {
      console.log('Please log in first')
    })
  }, []);

  return (
    <>
      <Routes loggedIn={loggedIn} userInfo={userInfo} />
    </>
  );
}

export default App;
