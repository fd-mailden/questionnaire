import React from "react";
import { RadioButton } from "./UI";

function TagsComponent({ options, rating, originAnswer, questionsId }) {
  return (
    <div className="tags__top">
      <p className="tags__text">{options.description}</p>
      <div className="tags__buttons">
        {options.tags.map((tag, index) => (
          <RadioButton
            questionsId={questionsId}
            originAnswer={originAnswer}
            key={index}
            rating={rating}
            tag={tag}
          />
        ))}
      </div>
    </div>
  );
}

export default TagsComponent;
