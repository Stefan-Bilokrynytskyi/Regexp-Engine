import React, { useEffect, useState, useRef } from "react";
import RegInput from "./UI/RegInput/RegInput.jsx";
import TestString from "./UI/TestString/TestString.jsx";
import MenuButton from "./UI/MenuButton/MenuButton.jsx";
import ReplaceString from "./UI/ReplaceString/ReplaceString.jsx";
import "./styles/reset.css";
import "./styles/App.css";

function App() {
  const [regex, setNewRegexp] = useState("");
  const [resultString, setResultString] = useState("");
  const [replaceString, setNewReplaceString] = useState(undefined);
  const regInputRef = useRef(null);

  const setRegexp = (newRegexp) => {
    regex += newRegexp;
    setNewRegexp(regex);
    regInputRef.current.focus();
  };

  const setReplaceString = (newReplaceString) => {
    console.log("a");
    setNewReplaceString(newReplaceString);
  };

  const [testString, setNewTestString] = useState("");

  const setNewResultString = (matchedString, resultString) => {
    if (replaceString === undefined) setNewTestString(matchedString);
    else {
      setNewTestString(matchedString);
      setResultString(resultString);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Regexp Engine</h1>
        <div className="stick"></div>
        <span className="signature">Author: Stefan Bilokrynytskyi</span>
      </header>
      <main className="page">
        <div className="main__wrapper">
          <div className="match__wrapper">
            <h2 className="match__header1">REGULAR EXPRESSION</h2>
            <RegInput
              curregex={regex}
              setNewRegexp={setNewRegexp}
              inputRef={regInputRef}
            />
            <h2 className="match__header2">TEST STRING</h2>
            <TestString
              testString={testString}
              setNewTestString={setNewResultString}
              replaceString={replaceString}
              curregex={regex}
              dangerouslySetInnerHTML={{ __html: testString }}
            />
          </div>

          <div className="regex__constructor">
            <MenuButton setter={setRegexp}>REGEX CONSTRUCTOR</MenuButton>
            <ReplaceString
              setReplaceString={setReplaceString}
              resultString={resultString}
            ></ReplaceString>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
