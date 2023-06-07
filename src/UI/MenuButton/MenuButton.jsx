import React, { useState } from "react";
import classes from "./MenuButton.module.css";
import RegExpression from "../RegExpression/RegExpression.jsx";

const MenuButton = React.forwardRef((props) => {
  let { children, setter } = { ...props };
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div>
      <button
        className={classes.MenuButton}
        onClick={() => setMenuVisible(!menuVisible)}
      >
        <h2
          className={
            menuVisible ? classes.constructor_open : classes.constructor_closed
          }
        >
          {children}
        </h2>
        {menuVisible && (
          <div class={classes.regex_constructor}>
            <RegExpression setter={setter}>
              Zero or more character<span class={classes.regSymbol}>*</span>
            </RegExpression>
            <RegExpression setter={setter}>
              Any character<span class={classes.regSymbol}>.</span>
            </RegExpression>
            <RegExpression setter={setter}>
              Zero or one character<span class={classes.regSymbol}>?</span>
            </RegExpression>
            <RegExpression setter={setter}>
              At least one character<span class={classes.regSymbol}>+</span>
            </RegExpression>
            <RegExpression setter={setter}>
              A character in range<span class={classes.regSymbol}>[A-Z]</span>
            </RegExpression>
            <RegExpression setter={setter}>
              A character not in range
              <span class={classes.regSymbol}>[^A-Z]</span>
            </RegExpression>
            <RegExpression setter={setter}>
              Word boundary<span class={classes.regSymbol}>\b</span>
            </RegExpression>
            <RegExpression setter={setter}>
              Exactly 3 character
              <span class={classes.regSymbol}>&#123;3&#125;</span>
            </RegExpression>
            <RegExpression setter={setter}>
              3 and more characters
              <span class={classes.regSymbol}>&#123;3,&#125;</span>
            </RegExpression>
            <RegExpression setter={setter}>
              Between 3 and 5 characters
              <span class={classes.regSymbol}>&#123;3,5&#125;</span>
            </RegExpression>
            <RegExpression setter={setter}>
              Start of string<span class={classes.regSymbol}>^</span>
            </RegExpression>
            <RegExpression setter={setter}>
              End of string<span class={classes.regSymbol}>$</span>
            </RegExpression>
            <RegExpression setter={setter}>
              Alternate - match either a or b
              <span class={classes.regSymbol}>(a|b)</span>
            </RegExpression>
          </div>
        )}
      </button>
    </div>
  );
});

export default MenuButton;
