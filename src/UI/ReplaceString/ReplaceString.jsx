import React, { useState } from "react";
import classes from "./ReplaceString.module.css";
import TestString from "../TestString/TestString.jsx";

const ReplaceString = React.forwardRef((props) => {
  let { children, setter } = { ...props };

  const [replaceVisible, setReplaceVisible] = useState(false);
  /*
  function onReplaceChange() {
    replaceVisible = !replaceVisible;
  }*/
  return (
    <div class={classes.replace_container}>
      <div class={classes.function_container}>
        <div class={classes.function_match}>
          <input
            checked={!replaceVisible}
            type="radio"
            id="match"
            name="function"
            value="match"
            onChange={() => setReplaceVisible(!replaceVisible)}
          />
          <label for="match" class={classes.label}>
            MATCH
          </label>
        </div>
        <div class={classes.function_replace}>
          <input
            type="radio"
            id="replace"
            name="function"
            value="replace"
            checked={replaceVisible}
            onChange={() => setReplaceVisible(!replaceVisible)}
          />
          <label for="replace" class={classes.label}>
            REPLACE
          </label>
        </div>
      </div>

      {replaceVisible && (
        <TestString style={{ width: "100%", flexGrow: "0" }}></TestString>
      )}
    </div>
  );
});

export default ReplaceString;
