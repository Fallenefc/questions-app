import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from './Pages/Dashboard/Dashboard';
import { getQuestions } from './Services/ApiClient';

function App() {

  const [questionList, setQuestionList] = useState(null);

  useEffect(() => {
    getQuestions().then((data: any) => setQuestionList(data.data));
  }, [])

  return (
    <Router>
    <Header />
    <Switch>
      {/* <Route path='/:sumName'>
       <SummonerInfo />
      </Route> */}
      <Route exact path='/'>
        <Dashboard questionList={questionList}/>
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
