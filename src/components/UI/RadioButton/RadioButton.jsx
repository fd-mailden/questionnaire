import React, { useState, useEffect } from "react";
import classes from "./RadioButton.module.scss";
import { useDispatch } from "react-redux";
import { changeAnswerRatingWithTagsAction } from "../../../storToolkit/questions/questionsReducers";

const RadioButton = React.memo(function RadioButton({ ...props }) {
  const { tag,  rating, originAnswer, questionsId } = props;
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setActive(false);
  }, [rating]);

  useEffect(() => {
    if (originAnswer.tags) {
      let value = originAnswer.tags.findIndex((item) => item === tag);
      if (value >= 0) {
        setActive(true);
      }
    }
  }, []);

  function addTag() {
    setActive(!isActive);
    const data = {
      answerId: questionsId,
      tag: tag,
      rating: rating,
    };
    dispatch(changeAnswerRatingWithTagsAction(data));
  }

  return (
    <button
      onClick={() => addTag()}
      type="button"
      className={!isActive ? classes.btn : classes.active}
    >
      {tag}
    </button>
  );
})

export default RadioButton;
