import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { useDispatch } from "react-redux";
import { changeAnswerMultiRatingAction } from "../storToolkit/questions/questionsReducers";

const IndicatorComponent = React.memo(function IndicatorComponent({ tag, questionId }) {
  const [rating, setRating] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    tag.indicator ? setRating(tag.rating) : setRating(0);
  }, []);
  const handleChange = (value) => {
    setRating(value);
    eventClick(value);
  };

  function eventClick(rating1) {
    const data = {
      answerId: questionId,
      indicator: tag.text,
      rating: rating1,
    };
    dispatch(changeAnswerMultiRatingAction(data));
  }

  return (
    <div className="indicator">
      <p className="indicator__text">{tag.text ? tag.text : tag.indicator}</p>
      <StarRating count={5} size={25} value={rating} onChange={handleChange} />
    </div>
  );
})

export default IndicatorComponent;
