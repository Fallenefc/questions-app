import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import {
  getQuestions,
  postQuestion,
  toggleAnswerService,
} from "./Services/ApiClient";
import AddQuestion from "./Pages/AddQuestion/AddQuestion";
import { QuestionsInterface } from "./Interfaces/Questions";
import Landing from "./Pages/Landing/Landing";
import Routes from "./Pages/Routes";

function App() {
  // Question List state. First it updates by API GET request
  // Then it updates locally so we do not have to make multiple API GET requests
  const [questionList, setQuestionList] = useState<QuestionsInterface[] | null>(
    null
  );

  ///// CHANGING CURRENT QUESTION SECTION

  // This state is the current question that the user is looking at
  // Changes when user clicks on another question, starts at index 0 as default
  // In the future, when user will be able to make it a full test, will be defaulted to the last question user answered, or first unanswered.
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  // Function to change the question according to user click
  const changeQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  ///// CRUD METHODS, MAKE API CALLS AND ALSO UPDATES STATE LOCALLY

  // ADDING QUESTION

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

  // TOGGLING ANSWER AS ANSWERED CORRECT (TRUE), INCORRECT (FALSE), OR NOT ANSWERED (NULL)

  const toggleAnswer = async (id: number, index: number, type: string) => {
    const response = await toggleAnswerService(id, type);
    let stateCopy: QuestionsInterface[] = [];
    Array.isArray(questionList)
      ? (stateCopy = [...questionList])
      : (stateCopy = []);
    stateCopy[index].done = type === "true";
    setCurrentQuestion(index);
    setQuestionList(stateCopy);
  };

  // Makes the API call when it starts, and set it to question list state
  useEffect(() => {
    getQuestions().then((data: any) => setQuestionList(data.data));
  }, []);

  return (
    // <Router>
    //   <Header />
    //   <Switch>
    //     <Route
    //       exact
    //       path="/addQuestion"
    //       component={() => <AddQuestion addQuestion={addQuestion} />}
    //     ></Route>
    //     <Route
    //       exact
    //       path="/"
    //       component={() => (
    //         <Dashboard
    //           questionList={questionList}
    //           toggleAnswer={toggleAnswer}
    //           changeQuestion={changeQuestion}
    //           current={currentQuestion}
    //         />
    //       )}
    //     ></Route>
    //     <Route
    //       exact
    //       path="/landing"
    //       component={() => (
    //         <Landing/>
    //       )}
    //     ></Route>
    //   </Switch>
    // </Router>
    <>
    <Routes />
    </>
  );
}

export default App;
