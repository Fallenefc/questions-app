import React, { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { postQuestion } from "../../Services/ApiClient";
import { addQuestionToQuestionBank } from "../../Store/actions";
import "./styles.css";

export default function AddQuestion(): ReactElement {
  // Ok, this works, it's pretty straightforward and not too confusing, try not to make any major changes so it bugs

  const [options, setOptions] = useState(["", "", ""]);
  const [stem, setStem] = useState("");
  const [correct, setCorrect] = useState(0);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e: any, index: number): void => {
    let stateCopy = [...options];
    stateCopy[index] = e.target.value;
    setOptions(stateCopy);
  };

  // This adds an option in the form
  const addAlternative = (e: any) => {
    e.preventDefault();
    if (options.length > 5) {
      alert("Cannot add more alternatives");
      return;
    }
    let newState = [...options];
    newState.push("");
    setOptions(newState);
  };

  // This removes the option in the form
  const deleteOption = (e: any, index: number) => {
    e.preventDefault();
    if (options.length <= 2) {
      alert("Minimum of two choices");
      return;
    }
    let newState = [...options];
    newState.splice(index, 1);
    setOptions(newState);
  };

  // Makes the API call and updates the state, redirect to view questions
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(title, stem, correct)
    if (!title || !stem || correct === undefined) {
      alert("Missing one or more params");
      return;
    }
    const response = await postQuestion({
      title: title,
      stem: stem,
      correct: correct,
      options: options,
      category: "Test",
    });
    if (response) dispatch(addQuestionToQuestionBank(response.data));
  };

  return (
    <form className="question-form">
      <p>Question Title</p>
      <input
        type="textarea"
        placeholder="Question Title"
        id="question-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p>Question Stem</p>
      <input
        type="textarea"
        placeholder="Question Stem"
        id="question-stem"
        value={stem}
        onChange={(e) => setStem(e.target.value)}
      />
      {options.map((option: string, index: number) => {
        return (
          <div className="options">
            <span>Option #{index + 1}</span>
            <input
              type="text"
              value={options[index]}
              onChange={(event) => {
                handleChange(event, index);
              }}
            ></input>
            <input
              type="radio"
              name="correct"
              value={index}
              onChange={() => setCorrect(index)}
            ></input>
            <button onClick={(event) => deleteOption(event, index)}>X</button>
          </div>
        );
      })}
      <div className="bottom-buttons">
        <button onClick={addAlternative}>Add Option</button>
        <button onClick={(event) => handleSubmit(event)}>Submit</button>
      </div>
    </form>
  );
}
