import React from "react";
import classes from "./Input.module.scss";
import classNames from "classnames";

const Input = React.forwardRef((props, ref) => {
  const { type = "text", isValidInput = true } = props;
  return (
    <input
      ref={ref}
      {...props}
      type={type}
      className={classNames(
        classes["form-input"],
        isValidInput
          ? classes["form-input--invalid"]
          : classes["form-input--valid"]
      )}
    />
  );
});

export default Input;
