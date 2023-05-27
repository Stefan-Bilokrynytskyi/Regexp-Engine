import React, { useState } from "react";
import classes from "./TestString.module.css";

const TestString = (props) => {
  return (
    <textarea
      placeholder="insert your test string here"
      className={classes.TestString}
      {...props}
    />
  );
};

export default TestString;
