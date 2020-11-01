import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { getQuestions, postQuestion, toggleAnswerService } from "./Services/ApiClient";
import AddQuestion from "./Pages/AddQuestion/AddQuestion";
import { QuestionsInterface } from "./Interfaces/Questions";

function App() {
  const [questionList, setQuestionList] = useState<QuestionsInterface[] | null>(
    null
  );

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  useEffect(() => {
    getQuestions().then((data: any) => setQuestionList(data.data));
  }, []);

  const changeQuestion = (index: number) => {
    setCurrentQuestion(index);
  }

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

  const toggleAnswer = async (id: number, index: number, type:string) => {
    const response = await toggleAnswerService(id, type);
    let stateCopy: QuestionsInterface[] = [];
    Array.isArray(questionList)
        ? (stateCopy = [...questionList])
        : (stateCopy = []);
    stateCopy[index].done = !stateCopy[index].done;
    setCurrentQuestion(index);
    setQuestionList(stateCopy);
  }

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
          component={() => <Dashboard questionList={questionList} toggleAnswer={toggleAnswer} changeQuestion={changeQuestion} current={currentQuestion}/>}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
