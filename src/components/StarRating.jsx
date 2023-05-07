import React from "react";

function StarRating({
  count,
  value,
  inactiveColor = "#9B9B9B",
  size = 20,
  activeColor = "#FF5A5E",
  onChange,
  ...props
}) {
  const stars = Array.from({ length: count }, () => "🟊");
  const handleChange = (e, value) => {
    onChange(value + 1);
  };

  return (
    <div>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style = activeColor;
        }
        if (value === 1 && index == 0) {
          style = "#000000";
        }
        return (
          <svg
            key={index}
            className={"star"}
            onClick={(e) => handleChange(e, index)}
            width={size}
            height={size}
            viewBox="0 0 34 34"
            version="1.1"
            xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 25.25L7.30154 30.3488L9.15378 19.5494L1.30757 11.9012L12.1508 10.3256L17 0.5L21.8492 10.3256L32.6924 11.9012L24.8462 19.5494L26.6985 30.3488L17 25.25Z"
              id="Star-Copy-3"
              fill={style}
              stroke="none"
            />
          </svg>
        );
      })}
    </div>
  );
}

export default StarRating;
