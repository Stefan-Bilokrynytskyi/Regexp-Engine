import React, { useState, useRef, useEffect } from "react";
import classes from "./TestString.module.css";
import matchTestString from "../../matches.js";
import replaceStr from "../../replace.js";

const TestString = (props) => {
  const { testString, setNewTestString, curregex, replaceString } = props;
  const [prevRegex, setPrevRegex] = useState(curregex);
  const [prevReplaceString, setPrevReplaceString] = useState(replaceString);
  const [shouldMoveCursor, setShouldMoveCursor] = useState(false);
  const inputRef = useRef(null);
  let debounceTimeout = null;

  useEffect(() => {
    console.log("yeah");
    if (curregex !== prevRegex) {
      if (inputRef.current) {
        const matchedString = matchTestString(
          curregex,
          inputRef.current.textContent
        );
        const resultString = replaceStr(
          curregex,
          inputRef.current.textContent,
          replaceString
        );
        setNewTestString(matchedString, resultString);
        setPrevRegex(curregex);
        setShouldMoveCursor(false);
      }
    } else if (prevReplaceString !== replaceString) {
      if (inputRef.current) {
        setPrevReplaceString(replaceString);
        const matchedString = matchTestString(
          curregex,
          inputRef.current.textContent
        );
        const resultString = replaceStr(
          curregex,
          inputRef.current.textContent,
          replaceString
        );
        setNewTestString(matchedString, resultString);

        setShouldMoveCursor(false);
      }
    }
  }, [curregex, setNewTestString, prevRegex, replaceString, prevReplaceString]);

  useEffect(() => {
    if (inputRef.current && shouldMoveCursor) {
      inputRef.current.focus();
      moveCursorToEnd(inputRef.current);
      setShouldMoveCursor(false);
    }
  }, [shouldMoveCursor]);

  const moveCursorToEnd = (element) => {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const onChangeTestString = (e) => {
    const newTestString = e.currentTarget.textContent;
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setShouldMoveCursor(true);
      console.log("lol");
      const matchedString = matchTestString(curregex, newTestString);
      const resultString = replaceStr(curregex, newTestString, replaceString);
      setNewTestString(matchedString, resultString);
    }, 10);
  };

  return (
    <div
      ref={inputRef}
      contentEditable
      placeholder="insert your test string here"
      className={classes.TestString}
      onInput={onChangeTestString}
      onFocus={() => setShouldMoveCursor(true)}
      {...props}
    />
  );
};

export default TestString;
