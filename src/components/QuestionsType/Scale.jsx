import React, {useState } from "react";
import { Title } from "../UI";
import CircleScale from "../CircleScale";
import { useDispatch } from "react-redux";
import { changeAnswerScaleAction } from "../../storToolkit/questions/questionsReducers";
import scale from "../../helpers/scaleHelper";

const Scale = React.memo(function Scale({ questions, setFinish }) {
  const dispatch = useDispatch();
  const [scaleNumber, setScaleNumber] = useState(
    questions.origin_answer.answer_data?.value
  );
  function addScale(scaleValue) {
    const answer_data = {
      answerId: questions.id,
      value: scaleValue,
    };
    dispatch(changeAnswerScaleAction(answer_data));
  }


  return (
    <div
      className="scale"
      style={
        questions.isDone ? { pointerEvents: "none", opacity: "0.4" } : null
      }
    >
      <Title>{questions.text}</Title>
      <div className="scale__circles">
        {scale.map((item) => {
          if (item.value == scaleNumber) {
            return (
              <CircleScale
                addScale={addScale}
                setFinish={setFinish}
                key={item.value}
                style="#FF5A5E"
                styleText="#fff"
                text={item.text}
                value={item.value}
                setScaleNumber={setScaleNumber}
              />
            );
          } else {
            return (
              <CircleScale
                addScale={addScale}
                setFinish={setFinish}
                key={item.value}
                style="#E0E0E0"
                text={item.text}
                value={item.value}
                setScaleNumber={setScaleNumber}
              />
            );
          }
        })}
      </div>
    </div>
  );
})

export default Scale;
