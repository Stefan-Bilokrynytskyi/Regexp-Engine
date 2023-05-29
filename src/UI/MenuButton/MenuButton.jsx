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
              Zero or one character<span class={classes.regSymbol}>?</span>
            </RegExpression>
            <RegExpression setter={setter}>
              Zero or one character<span class={classes.regSymbol}>?</span>
            </RegExpression>
            <RegExpression setter={setter}>
              Zero or one character<span class={classes.regSymbol}>?</span>
            </RegExpression>
            <RegExpression setter={setter}>
              Zero or one character<span class={classes.regSymbol}>?</span>
            </RegExpression>
          </div>
        )}
      </button>
    </div>
  );
});

export default MenuButton;
