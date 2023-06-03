import match from "./regexpEngine";
import "./Matches.css";

const replaceStr = (expr, string, replaceString = undefined) => {
  let resultString = "";
  console.log(replaceString);
  let matched, matchPos, matchLength;

  while (match(expr, string)[0]) {
    [matched, matchPos, matchLength] = match(expr, string);

    const stringBeforeMatch = string.slice(0, matchPos);

    resultString +=
      stringBeforeMatch + `<span class="match">${replaceString}</span>`;

    string = string.slice(matchPos + matchLength);
  }

  resultString += string;
  console.log(resultString);
  return resultString;
};

export default replaceStr;
