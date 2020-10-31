import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Header(): ReactElement<React.FC> {
  return (
    <header className="header">
      <Link to="/">
        <div className="home">
          <span>Home</span>
        </div>
      </Link>
      <Link to="/addQuestion">
        <div className="add-question">
          <span>Add a Question</span>
        </div>
      </Link>
      <div className="about">
        <span>About</span>
      </div>
    </header>
  );
}
