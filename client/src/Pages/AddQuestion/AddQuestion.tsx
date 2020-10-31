import React, { ReactElement, useState } from "react";
import { QuestionsInterface } from "../../Interfaces/Questions";
import "./styles.css";

export default function AddQuestion({addQuestion}: any): ReactElement {

  const [options, setOptions] = useState(["", "", ""]);
  const [stem, setStem] = useState('');
  const [correct, setCorrect] = useState(0);

  const mockObj = {
    "stem": "What is the name of our doggoo?",
    "options": ["Filho", "Estopinha", "Bianca"],
    "correct": 1,
    "category": "Test"
  }

  const handleChange = (e: any, index: number): void => {
    let stateCopy = [...options];
    stateCopy[index] = e.target.value;
    setOptions(stateCopy);
  };

  const addAlternative = (e: any): void => {
    e.preventDefault()
    let newState = [...options]
    newState.push('');
    setOptions(newState)
  }

  const deleteOption = (e: any, index: number) => {
    e.preventDefault();
    let newState = [...options]
    newState.splice(index, 1)
    setOptions(newState)
  }

  const handleSubmit = (e: any, content:QuestionsInterface) => {
    e.preventDefault();
    addQuestion(
      {
        stem: stem,
        correct: correct,
        options: options,
        category: 'Test'
      }
    )
  }

  return (
    <div className="question-container">
      <form className="question-form">
        <p>Question Stem</p>
        <input type="textarea" placeholder="Question Stem" id="question-stem" value={stem} onChange={(e) => setStem(e.target.value)}/>
        {options.map((option: string, index: number) => {
          return (
            <div>
              <p>Option #{index + 1}</p>
              <input
                type='text'
                value={options[index]}
                onChange={(event) => {
                  handleChange(event, index);
                }}
              ></input>
              <input type='radio' name='correct' value={index} onChange={() => setCorrect(index)}></input>
              <button onClick={(event) => deleteOption(event, index)}>X</button>
            </div>
          );
        })}
        <div className='bottom-buttons'>
        <button onClick={addAlternative}>Add Question</button>
        <button onClick={(event) => handleSubmit(event, mockObj)}>Submit</button>
        </div>
      </form>
    </div>
  );
}
