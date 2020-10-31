import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { getQuestions, postQuestion } from "./Services/ApiClient";
import AddQuestion from "./Pages/AddQuestion/AddQuestion";
import { QuestionsInterface } from "./Interfaces/Questions";

function App() {
  const [questionList, setQuestionList] = useState<QuestionsInterface[] | null>(
    null
  );

  useEffect(() => {
    getQuestions().then((data: any) => setQuestionList(data.data));
  }, []);

  const addQuestion = (content: QuestionsInterface) => {
    postQuestion(content).then((response: any) => {
      let stateCopy: QuestionsInterface[] = [];
      Array.isArray(questionList)
        ? (stateCopy = [...questionList])
        : (stateCopy = []);
      stateCopy.push(response);
      setQuestionList(stateCopy);
    });
  };

  return (
    <Router>
      <Header />
      <Switch>
        <Route
          exact
          path="/addQuestion"
          component={() => <AddQuestion addQuestion={addQuestion} />}
        ></Route>
        <Route
          exact
          path="/"
          component={() => <Dashboard questionList={questionList} />}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
