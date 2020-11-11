import React, { useEffect, useState } from "react";
import "./App.css";
import {getInfo} from "./Services/ApiClient";
import Routes from "./Pages/Routes";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Makes the API call when it starts, and set it to question list state
  useEffect(() => {
    // localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFjNTY3ODFlMjU4MjM3MzIxMjQwMjEiLCJpYXQiOjE2MDUxMzQwNzEsImV4cCI6MTYwNTIyMDQ3MX0.78jhutlR3t6N5mrx4sJrw3QEt2pJQ_42H6sOe2i4BuI');
    getInfo().then((response): any => {
      if (response) {
        console.log(response.data);
        setLoggedIn(true);
        setUserInfo(response.data)
      }
    })
  }, []);

  return (
    <>
    <Routes loggedIn={loggedIn} userInfo={userInfo} />
    </>
  );
}

export default App;
