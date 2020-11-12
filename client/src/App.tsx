import React, { useEffect, useState } from "react";
import "./App.css";
import {getInfo} from "./Services/ApiClient";
import Routes from "./Pages/Routes";
import { User } from "./Interfaces/User";
import {useDispatch} from 'react-redux';
import {addUser} from './Store/actions';

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(null); // does not need both states to be fair

  const dispatch = useDispatch();

  // Makes the API call when it loads, and set loggedIn and userInfo states
  useEffect(() => {
    getInfo().then((response): void => {
      if (response) {
        console.log(response.data);
        setLoggedIn(true);
        // setUserInfo(response.data)
        dispatch(addUser(response.data));
      } //should I also get questions and quizzes infos on this first API call?
    })
  }, []);

  return (
    <>
      <Routes loggedIn={loggedIn} userInfo={userInfo} />
    </>
  );
}

export default App;
