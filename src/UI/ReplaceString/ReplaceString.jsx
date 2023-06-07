import React, { useState } from "react";
import classes from "./ReplaceString.module.css";
import TestString from "../TestString/TestString.jsx";

const ReplaceString = (props) => {
  let { setReplaceString, resultString } = props;

  const [replaceVisible, setReplaceVisible] = useState(false);

  const replaceStringOpen = (e) => {
    setReplaceVisible(!replaceVisible);
    setReplaceString("");
  };

  const replaceStringClosed = (e) => {
    setReplaceVisible(!replaceVisible);
    setReplaceString(undefined);
  };

  const setNewReplaceString = (e) => {
    setReplaceString(e.target.value);
  };

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
            onChange={replaceStringClosed}
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
            onChange={replaceStringOpen}
          />
          <label for="replace" class={classes.label}>
            REPLACE
          </label>
        </div>
      </div>

      {replaceVisible && (
        <div class={classes.replaceStringBlock}>
          <textarea
            class={classes.replaceString}
            onChange={setNewReplaceString}
          ></textarea>
          <label class={classes.label}>RESULTS</label>
          <div
            class={classes.resultString}
            dangerouslySetInnerHTML={{ __html: resultString }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ReplaceString;
