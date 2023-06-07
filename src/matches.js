import match from "./regexpEngine";
import "./Matches.css";

const matchTestString = (expr, string) => {
  let resultString = "";

  while (match(expr, string)[0]) {
    const [matched, matchPos, matchLength] = match(expr, string);

    const matchedString = string.slice(matchPos, matchPos + matchLength);
    const stringBeforeMatch = string.slice(0, matchPos);

    resultString +=
      stringBeforeMatch + `<span class="match">${matchedString}</span>`;

    string = string.slice(matchPos + matchLength);
  }

  resultString += string;

  return resultString;
};

export default matchTestString;
