import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../../Components/Header/Header";
import NavBar from "../../Components/NavBar/NavBar";
import QuestionList from "../../Components/QuestionList/QuestionList";
import AddQuestion from "../AddQuestion/AddQuestion";
import CreateQuiz from "../CreateQuiz/CreateQuiz";
import Dashboard from "../Dashboard/Dashboard";
import SingleQuizPage from "../SingleQuizPage/SingleQuizPage";
import StudentExam from "../StudentExam/StudentExam";
import ViewQuizzes from "../ViewQuizzes/ViewQuizzes";
import './styles.css'

const LoggedOnRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <NavBar />
        <Switch>
					<div className='container-box'>
          	<Route exact path="/" component={() => <Dashboard />} />
          	<Route path="/addQuestion" exact component={AddQuestion} />
						<Route path="/viewQuestions" exact component={QuestionList} />
            <Route path="/viewQuizzes" exact component={ViewQuizzes} />
            <Route path="/createQuiz" exact component={CreateQuiz} />
            <Route path="/quiz/:quizId" exact component={SingleQuizPage} />
            <Route path="/studentExam/:examId" exact component={StudentExam}/>
					</div>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default LoggedOnRoutes;
