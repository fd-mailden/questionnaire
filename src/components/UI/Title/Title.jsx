import React from "react";
import classes from "./Title.module.scss";

function Title({ children, ...props }) {
  return (
    <h2 {...props} className={classes.title}>
      {children}
    </h2>
  );
}

export default Title;
