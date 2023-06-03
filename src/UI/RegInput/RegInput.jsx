import React, { forwardRef } from "react";
import classes from "./RegInput.module.css";

const RegInput = forwardRef((props) => {
  const { curregex, setNewRegexp, inputRef } = { ...props };

  return (
    <input
      ref={inputRef}
      placeholder="enter text"
      className={classes.RegInput}
      onChange={(e) => setNewRegexp(e.target.value)}
      value={curregex}
      {...props}
    />
  );
});

export default RegInput;
