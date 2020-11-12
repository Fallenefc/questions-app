import React, { useEffect, useState } from "react";
import "./App.css";
import {getInfo, getApiQuestions} from "./Services/ApiClient";
import Routes from "./Pages/Routes";
import { User } from "./Interfaces/User";
import {useDispatch} from 'react-redux';
import {addUser, getQuestions} from './Store/actions';

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(null); // does not need both states to be fair

  const dispatch = useDispatch();

  // Makes the API call when it loads, and set loggedIn and userInfo states
  useEffect(() => {
    getInfo().then((response): void => {
      if (response) {
        // console.log(response.data);
        setLoggedIn(true);
        // setUserInfo(response.data)
        dispatch(addUser(response.data));
      }
    }).catch(err => {
      console.log('Please log in first')
    }).then((response): any => {
      // make the API request to get the questions, then update Redux state
      getApiQuestions().then((response: any) => {
        // console.log(response.data);
        dispatch(getQuestions(response.data));
      })
    })
  }, []);

  return (
    <>
      <Routes loggedIn={loggedIn} userInfo={userInfo} />
    </>
  );
}

export default App;
