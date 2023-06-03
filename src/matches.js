import match from "./regexpEngine";
import "./Matches.css";

const matches = (expr, string) => {
  let resultString = "";

  let matched, matchPos, matchLength;

  while (match(expr, string)[0]) {
    [matched, matchPos, matchLength] = match(expr, string);

    const matchedString = string.slice(matchPos, matchPos + matchLength);
    const stringBeforeMatch = string.slice(0, matchPos);

    resultString +=
      stringBeforeMatch + `<span class="match">${matchedString}</span>`;

    string = string.slice(matchPos + matchLength);
  }

  resultString += string;
  console.log(resultString);
  return resultString;
};

export default matches;
