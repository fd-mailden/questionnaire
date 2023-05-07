import React from "react";

const CircleScale = React.memo(function CircleScale({ ...props }) {
  const {
    value,
    setFinish,
    text = "",
    setScaleNumber,
    style = "#E0E0E0",
    styleText,
    addScale,
  } = props;
  function setNumber() {
    setFinish(true);
    setScaleNumber(value);
    addScale(value);
  }
  return (
    <div className="circle">
      <button
        onClick={() => setNumber()}
        style={{ background: style }}
        className="circle__btn"
      >
        <p style={{ color: styleText }} className="circle__value">
          {value}
        </p>
      </button>

      <p className="circle__text">{text}</p>
    </div>
  );
});
export default CircleScale;
