import React, { useState } from "react";
import IndicatorComponent from "../IndicatorComponent";
import { Title } from "../UI";

const MultiRating = React.memo(function MultiRating({ questions }) {
  const quest = questions.options.indicators.map((item, index) => {
    return { id: index, text: item, value: 0 };
  });
  const [multiRating, setMultiRating] = useState(
    questions.origin_answer.answer_data.length >= 2
      ? questions.origin_answer.answer_data
      : quest
  );
  return (
    <div
      className="multi-rating"
      style={
        questions.isDone ? { pointerEvents: "none", opacity: "0.4" } : null
      }
    >
      <Title>{questions.text}</Title>
      {multiRating.map((tag, index) => (
        <IndicatorComponent
          answerRating={questions.origin_answer.answer_data}
          questionId={questions.id}
          key={index}
          tag={tag}
        />
      ))}
    </div>
  );
})

export default MultiRating;
