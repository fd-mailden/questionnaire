import React from "react";
import classes from "./LinkNavigation.module.scss";
import { Link } from "react-router-dom";

function LinkNavigation({ children, ...props }) {
  return (
    <Link to={"/" + props.navigation} {...props} className={classes.link}>
      {children}
    </Link>
  );
}

export default LinkNavigation;
