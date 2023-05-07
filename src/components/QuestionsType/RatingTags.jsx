import React, { useState, useEffect } from "react";
import { Title } from "../UI";
import TagsComponent from "../TagsComponent";
import StarRating from "../StarRating";
import { useDispatch } from "react-redux";
import { changeAnswerRatingWithTagsAction } from "../../storToolkit/questions/questionsReducers";

const RatingTags = React.memo(function RatingTags({ questions, page }) {
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const handleChange = (value) => {
    setRating(value);
    const data = {
      answerId: questions.id,
      tag: [],
      rating: value,
    };
    dispatch(changeAnswerRatingWithTagsAction(data));
  };
  useEffect(() => {
    if (questions.origin_answer.answer_data.rating) {
      setRating(questions.origin_answer.answer_data.rating);
    }
  }, [page]);

  return (
    <div
      className="tags"
      style={
        questions.isDone ? { pointerEvents: "none", opacity: "0.4" } : null
      }
    >
      <Title>How was DDB this week?</Title>
      <StarRating count={5} size={30} value={rating} onChange={handleChange} />
      {rating ? (
        <TagsComponent
          questionsId={questions.id}
          originAnswer={questions.origin_answer.answer_data}
          rating={rating}
          options={
            rating <= 3 ? questions.options["3"] : questions.options["5"]
          }
        />
      ) : (
        <p className="tags__text">{questions.description}</p>
      )}
    </div>
  );
});

export default RatingTags;
