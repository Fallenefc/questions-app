import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import ReportModal from "../ReportModal/ReportModal";
import "./styles.css";

interface Props {
  quiz: any;
}

export default function QuizCard({ quiz }: Props): ReactElement {
  const history = useHistory();

  const [reportModal, setReportModal] = useState(false);

  const handleReportModal = () => {
    setReportModal(false);
  }

  const handleClick = (id: string) => {
    // redirect to page
    history.push({ pathname: `/quiz/${id}` });
  };

  return (
    <div className="quiz-card-main">
      {reportModal ? <ReportModal doneBy={quiz.doneBy} title={quiz.title} handleReportModal={handleReportModal}/> : null}
      <div className="quiz-card-left" onClick={() => handleClick(quiz._id)}>
        <div className="quizcard-title">{quiz.title}</div>
        <div className="total-questions">
          Total Questions: {quiz.questions.length}
        </div>
        {quiz.submitted ? (
          <div className="submitted">Quiz ID: {quiz.hashedId}</div>
        ) : (
          <div className="submitted">Not Submitted</div>
        )}
      </div>
      <div className='quiz-card-right' onClick={() => setReportModal(true)}>
            Student Reports ({quiz.doneBy.length})
      </div>
    </div>
  );
}
