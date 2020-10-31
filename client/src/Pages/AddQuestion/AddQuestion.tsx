import React, { ReactElement, useState } from "react";
import "./styles.css";

export default function AddQuestion(): ReactElement {
  const [options, setOptions] = useState(["", "", ""]);

  const handleChange = (e: any, index: number): void => {
    let stateCopy = [...options];
    stateCopy[index] = e.target.value;
    setOptions(stateCopy);
    console.log(options);
  };

  const addAlternative = (e: any): void => {
    e.preventDefault()
    let newState = [...options]
    newState.push('');
    setOptions(newState)
  }

  return (
    <div className="question-container">
      <form className="question-form">
        <p>Question Stem</p>
        <input type="textarea" placeholder="Question Stem" id="question-stem" />
        {options.map((option: string, index: number) => {
          return (
            <div>
              <p>Option #{index + 1}</p>
              <input
                type="text"
                value={options[index]}
                onChange={(event) => {
                  handleChange(event, index);
                }}
              ></input>
              <input type='radio' name='correct' value={index}></input>
            </div>
          );
        })}
        <button onClick={addAlternative}>Add Question</button>
        <button>Submit</button>
      </form>
    </div>
  );
}
