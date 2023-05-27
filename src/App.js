import React, { useEffect, useState } from "react";
import RegInput from "./UI/RegInput/RegInput.jsx";
import TestString from "./UI/TestString/TestString.jsx";
import MenuButton from "./UI/MenuButton/MenuButton.jsx";
import RegExpression from "./UI/RegExpression/RegExpression.jsx";
import "./styles/reset.css";
import "./styles/App.css";

function App() {
  let [regex, setNewRegexp] = useState("");
  const setRegexp = (newRegexp) => {
    regex = newRegexp;
    setNewRegexp(regex);
  };

  return (
    <div className="App">
      <header class="header">
        <h1>Regexp Online</h1>
        <div class="stick"></div>
        <span class="signature">Author: Stefan Bilokrynytskyi</span>
      </header>
      <main class="page">
        <div class="main__wrapper">
          <div class="match__wrapper">
            <h2 class="match__header1">REGULAR EXPRESSION</h2>
            <RegInput curregex={regex} setNewRegexp={setNewRegexp} />
            <h2 class="match__header2">TEST STRING</h2>
            <TestString></TestString>
          </div>

          <div class="regex__constructor">
            <RegExpression setter={setNewRegexp}>broo</RegExpression>
            <MenuButton>REGEX CONSTRUCTOR</MenuButton>
            <MenuButton>REPLACE STRING</MenuButton>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
