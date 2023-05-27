import React from "react";
import classes from "./RegExpression.module.css";

const RegExpression = React.forwardRef((props) => {
  let { children, setter } = { ...props };

  function regOnclick() {
    setter(children);
  }

  return (
    <button className={classes.RegExpression} onClick={regOnclick}>
      {children}
    </button>
  );
});

export default RegExpression;
