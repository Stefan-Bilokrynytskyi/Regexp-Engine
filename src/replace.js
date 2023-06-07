import match from "./regexpEngine";
import "./Matches.css";

const replaceStr = (expr, string, replaceString) => {
  let resultString = "";

  while (match(expr, string)[0]) {
    const [matched, matchPos, matchLength] = match(expr, string);

    const stringBeforeMatch = string.slice(0, matchPos);

    resultString +=
      stringBeforeMatch + `<span class="match">${replaceString}</span>`;

    string = string.slice(matchPos + matchLength);
  }

  resultString += string;

  return resultString;
};

export default replaceStr;
