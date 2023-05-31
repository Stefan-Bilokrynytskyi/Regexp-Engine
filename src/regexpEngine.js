const isAlpha = function (ch) {
  return (
    typeof ch === "string" &&
    ch.length === 1 &&
    ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z"))
  );
};

const isDidgit = (ch) => {
  return typeof ch === "string" && ch.length === 1 && ch >= "0" && ch <= "9";
};

const isInRange = (startOfRange, endOfRange, ch) => {
  return ch >= startOfRange && ch <= endOfRange ? true : false;
};

const isOutOfRange = (startOfRange, endOfRange, ch) => {
  return ch < startOfRange || ch > endOfRange ? true : false;
};

const isRegulator = (str) => (str ? str.includes("{") : false);

const splitRegulator = (regulator, str) => {
  if (regulator.includes(",")) {
    regulator = regulator.slice(1, regulator.length - 1).split(",");

    return regulator[1] === ""
      ? [+regulator[0], str.length]
      : regulator.map((el) => +el);
  }
  regulator = regulator.slice(1, regulator.length - 1);

  return [+regulator, +regulator];
};

const isStart = (ch) => ch === "^";

const isEnd = (ch) => ch === "$";

const isStar = (ch) => ch === "*";

const isPlus = (ch) => ch === "+";

const isQuestion = (ch) => ch === "?";

const isOperator = (ch) =>
  isStar(ch) || isPlus(ch) || isQuestion(ch) || isRegulator(ch);

const isDot = (ch) => ch === ".";

const isEscape = (ch) => ch === "\\";

const isEscapeSequence = (term) => isEscape(term[0]);

const isOpenAlternate = (ch) => ch === "(";

const isCloseAlternate = (ch) => ch === ")";

const isCloseSet = (ch) => ch === "]";

const isOpenSet = (ch) => ch === "[";

function isLiteral(ch) {
  return (
    (typeof ch === "string" &&
      ch.length === 1 &&
      ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z"))) ||
    (ch >= "0" && ch <= "9") ||
    (typeof ch === "number" && ch <= 9 && ch >= 0) ||
    [" ", ":", "/"].includes(ch)
  );
}

function isAlternate(term) {
  return isOpenAlternate(term[0]) && isCloseAlternate(term.at(-1));
}

function isSet(term) {
  return isOpenSet(term[0]) && isCloseSet(term.at(-1));
}

function isUnit(term) {
  return (
    isLiteral(term[0]) ||
    isDot(term[0]) ||
    isSet(term) ||
    isEscapeSequence(term)
  );
}

function splitAlternate(alternate) {
  return alternate.slice(1, alternate.length - 1).split("|");
}

function splitSet(setHead) {
  const setInside = setHead.slice(1, setHead.length - 1);
  const setTerms = setInside.split("");
  return setTerms;
}

function splitExpression(expr) {
  console.log(expr);
  let head;
  let operator;
  let rest;
  let lastExprPos = 0;

  if (isOpenSet(expr[0])) {
    lastExprPos = expr.indexOf("]") + 1;
    head = expr.slice(0, lastExprPos);
  } else if (isOpenAlternate(expr[0])) {
    lastExprPos = expr.indexOf(")") + 1;
    head = expr.slice(0, lastExprPos);
  } else if (isEscape(expr[0])) {
    lastExprPos += 2;
    head = expr.slice(0, 2);
  } else {
    lastExprPos = 1;
    head = expr[0];
  }

  if (lastExprPos < expr.length && isOperator(expr[lastExprPos])) {
    operator = expr[lastExprPos];
    if (isRegulator(operator)) {
      operator = expr.slice(lastExprPos, expr.indexOf("}") + 1);
      lastExprPos = expr.indexOf("}") + 1;
    } else lastExprPos += 1;
  }

  rest = expr.slice(lastExprPos);
  return [head, operator, rest];
}

function isUnitMatch(expr, string) {
  let [head, operator, rest] = splitExpression(expr);
  if (string.length === 0) {
    return false;
  }

  if (isLiteral(head)) {
    return expr[0] === string[0];
  } else if (isDot(head)) {
    return true;
  } else if (isEscapeSequence(head)) {
    if (head === "\\a") {
      return isAlpha(string[0]);
    } else if (head === "\\d") {
      return isDidgit(string[0]);
    } else {
      return false;
    }
  } else if (isSet(head)) {
    let setTerms = splitSet(head);
    if (setTerms[0] === "^") {
      if (setTerms.includes("-")) {
        while (setTerms.indexOf("-") !== -1) {
          const startOfRange = setTerms[setTerms.indexOf("-") - 1];
          const endOfRange = setTerms[setTerms.indexOf("-") + 1];
          if (!isOutOfRange(startOfRange, endOfRange, string[0])) {
            return false;
          }
          setTerms[setTerms.indexOf("-") - 1] = "";
          setTerms[setTerms.indexOf("-") + 1] = "";
          setTerms[setTerms.indexOf("-")] = "";
        }
      }
      return !setTerms.includes(string[0]);
    } else {
      if (setTerms.includes("-")) {
        while (setTerms.indexOf("-") !== -1) {
          const startOfRange = setTerms[setTerms.indexOf("-") - 1];
          const endOfRange = setTerms[setTerms.indexOf("-") + 1];
          if (isInRange(startOfRange, endOfRange, string[0])) {
            return true;
          }
          setTerms[setTerms.indexOf("-") - 1] = "";
          setTerms[setTerms.indexOf("-") + 1] = "";
          setTerms[setTerms.indexOf("-")] = "";
        }
      }
      return setTerms.includes(string[0]);
    }
  }
  return false;
}

function matchMultiple(
  expr,
  string,
  matchLength,
  minMatchLength = undefined,
  maxMatchLength = undefined
) {
  let [head, operator, rest] = splitExpression(expr);

  if (!minMatchLength) {
    minMatchLength = 0;
  }

  let submatchLength = -1;

  let subexprMatched;
  let subexprLength;

  while (!maxMatchLength || submatchLength < maxMatchLength) {
    [subexprMatched, subexprLength] = matchExpression(
      head.repeat(submatchLength + 1) || "",
      string,
      matchLength
    );

    if (subexprMatched) {
      submatchLength += 1;
    } else {
      break;
    }
  }

  let matched;
  let newMatchLength;

  while (submatchLength >= minMatchLength) {
    [matched, newMatchLength] = matchExpression(
      head.repeat(submatchLength) + rest,
      string,
      matchLength
    );

    if (matched) {
      return [matched, newMatchLength];
    }

    submatchLength -= 1;
  }

  return [false, undefined];
}

function matchStar(expr, string, matchLength) {
  return matchMultiple(expr, string, matchLength, undefined, undefined);
}

function matchPlus(expr, string, matchLength) {
  return matchMultiple(expr, string, matchLength, 1, undefined);
}

function matchQuestion(expr, string, matchLength) {
  return matchMultiple(expr, string, matchLength, 0, 1);
}

function matchRegulator(expr, string, matchLength, min, max) {
  return matchMultiple(expr, string, matchLength, min, max);
}

function matchAlternate(expr, string, matchLength) {
  let [head, operator, rest] = splitExpression(expr);
  let options = splitAlternate(head);
  let matched;
  let newMatchLength;
  for (let option in options) {
    [matched, newMatchLength] = matchExpression(
      options[option] + rest,
      string,
      matchLength
    );
    if (matched) {
      return [matched, newMatchLength];
    }
  }

  return [false, undefined];
}

function matchExpression(expr, string, matchLength = 0) {
  if (expr.length === 0) {
    return [true, matchLength];
  } else if (isEnd(expr[0])) {
    if (string.length === 0) {
      return [true, matchLength];
    } else {
      return [false, undefined];
    }
  }
  let [head, operator, rest] = splitExpression(expr);

  if (isStar(operator)) {
    return matchStar(expr, string, matchLength);
  } else if (isPlus(operator)) {
    return matchPlus(expr, string, matchLength);
  } else if (isQuestion(operator)) {
    return matchQuestion(expr, string, matchLength);
  } else if (isRegulator(operator)) {
    const [min, max] = splitRegulator(operator, string);
    return min <= max
      ? matchRegulator(expr, string, matchLength, min, max)
      : [false, undefined];
  } else if (isAlternate(head)) {
    return matchAlternate(expr, string, matchLength);
  } else if (isUnit(head)) {
    if (isUnitMatch(expr, string)) {
      return matchExpression(rest, string.slice(1), matchLength + 1);
    }
  } else {
    console.log(`Unknown token in expr ${expr}.`);
  }
  return [false, undefined];
}

function match(expr, string) {
  let matchPos = 0;
  let matched = false;
  let maxMatchPos;
  if (isStart(expr[0])) {
    maxMatchPos = 0;
    expr = expr.slice(1);
  } else {
    maxMatchPos = string.length - 1;
  }

  while (!matched && matchPos <= maxMatchPos) {
    const [matched, matchLength] = matchExpression(
      expr,
      string.slice(matchPos)
    );
    if (matched && matchLength !== 0) {
      return [matched, matchPos, matchLength];
    }
    matchPos += 1;
  }
  return [false, undefined, undefined];
}

function main() {
  let expr = "\\a";
  console.log(expr);
  // let expr = '\\a+'

  let string = "sa343";
  let [matched, matchPos, matchLength] = match(expr, string);

  if (matched) {
    console.log(
      `matchExpression(${expr}, ${string}) = ${string.slice(
        matchPos,
        matchPos + matchLength
      )}`
    );
  } else {
    console.log(`matchExpression(${expr}, ${string}) = false`);
  }
}

main();
