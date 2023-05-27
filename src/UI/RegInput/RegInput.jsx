import React, { useState } from "react";
import classes from "./RegInput.module.css";

const RegInput = (props) => {
  console.log(props);
  const { curregex, setNewRegexp } = { ...props };
  console.log(curregex);
  return (
    <input
      placeholder="enter text"
      className={classes.RegInput}
      onChange={(e) => setNewRegexp(e.target.value)}
      value={curregex}
      {...props}
    />
  );
};

export default RegInput;
