import React from "react";
import { RatingTags, MultiRating, Scale } from "../QuestionsType";
import { Title } from "../UI";

function Questions({ ...props }) {
  const { mergeData, page, setFinish } = props;
 
  return (
    <div className="questions__types">
      {mergeData.map((q, index) => {
        if (q.type.name == "Rating with Tags") {
          return page + 1 === q.id ? (
            <RatingTags key={index} questions={q} page={page} />
          ) : null;
        }
        if (q.type.name == "Multi Rating") {
          return page + 1 === q.id ? (
            <MultiRating
              key={index}
              originAnswer={q.origin_answer.answer_data}
              questions={q}
            />
          ) : null;
        }
        if (q.type.name == "Scale") {
          return page + 1 === q.id ? (
            <Scale key={index} setFinish={setFinish} questions={q} />
          ) : null;
        }
      })}
      {page === mergeData.length ? (
        <Title style={{ width: "100%" }}>Thanks</Title>
      ) : null}
    </div>
  );
}

export default Questions;
