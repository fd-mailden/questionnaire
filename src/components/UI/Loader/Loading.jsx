import React, { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Puff } from "react-loader-spinner";
import classes from "./Loading.module.scss";

function Loading({ color = "#FF5A5E" , ...props}) {
  // useEffect(() => {
  //   setTimeout(() => {
  //     props.setLoading(true);
  //   }, 2000);
  // }, []);

  return (
    <div className={classes.loader}>
      <Puff
        height={props.height}
        width={props.width}
        color={color}
        ariaLabel="loading"
      />
    </div>
  );
}

export default Loading;
