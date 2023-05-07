import React from "react";
import classes from "./Button.module.scss";

function Button({ children, ...props}) {
  const {type = 'button'} = props
  return (
    <button {...props} type = {type} className={classes.btn}>
      {children}
    </button>
  );
}

export default Button;
 