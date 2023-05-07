import React, { useState, useEffect } from "react";
import { Title } from "./UI";
import { useDispatch, useSelector } from "react-redux";
import { addFeedbackAction } from "../storToolkit/questions/questionsReducers";

function Feedback({ feedback, page, setModalActive, mergeData }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  useEffect(() => {
    feedback ? setText(feedback) : setText("");
  }, [page]);

  function addFeedback() {
    let feedbackData = {
      id: page,
      feedback: text,
    };
    dispatch(addFeedbackAction(feedbackData));
    setModalActive(false);
  }
  return (
    <div className="feedback">
      <Title>Add feedback</Title>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="feedback__text"
        placeholder="What did they do well at or what went wrong?"
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <div className="feedback__buttons">
        <button
          onClick={() => setModalActive(false)}
          className="btn-navigation"
        >
          Back
        </button>
        <button
          disabled={mergeData[page]?.isDone}
          onClick={() => addFeedback()}
          className="btn-navigation"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Feedback;
