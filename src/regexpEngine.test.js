import match from "./regexpEngine";

describe("List based on array ", () => {
  it("character", () => {
    const [matched, matchPos, matchLength] = match("c", "abcd");
    expect(matchPos).toBe(2);
  });

  it("any character", () => {
    const [matched, matchPos, matchLength] = match(".", "abcd");
    expect(matchPos).toBe(0);
  });

  it("alternate", () => {
    const [matched, matchPos, matchLength] = match("(a|b)", "lola");
    expect(matchPos).toBe(3);
  });

  it("start of string", () => {
    const [matched, matchPos, matchLength] = match("^l", "lola");
    expect(matchPos).toBe(0);
  });

  it("end of string", () => {
    const [matched, matchPos, matchLength] = match("a$", "lola");
    expect(matchPos).toBe(3);
  });

  it("any digit", () => {
    const [matched, matchPos, matchLength] = match("\\d", "lo2la");
    expect(matchPos).toBe(2);
  });

  it("any letter", () => {
    const [matched, matchPos, matchLength] = match("\\a", "82a34");
    expect(matchPos).toBe(2);
  });

  it("word", () => {
    let str = "dog cat dog";
    const [matched, matchPos, matchLength] = match("\\bcat\\b", str);

    str = str.slice(matchPos, matchPos + matchLength);
    console.log(str);
    expect(str).toBe(" cat ");
  });

  it("One character from listed", () => {
    const [matched, matchPos, matchLength] = match("[abc]", "stena");
    expect(matchPos).toBe(4);
  });

  it("One character from range", () => {
    const [matched, matchPos, matchLength] = match("[A-Z]", "stEna");
    expect(matchPos).toBe(2);
  });

  it("One character not from range", () => {
    const [matched, matchPos, matchLength] = match("[^a-z]", "stEna");
    expect(matchPos).toBe(2);
  });

  it("operator star", () => {
    let str = "dog cat dog";
    const [matched, matchPos, matchLength] = match("d.*g", str);

    str = str.slice(matchPos, matchPos + matchLength);

    expect(str).toBe("dog cat dog");
  });

  it("operator plus", () => {
    let str = "grass";
    const [matched, matchPos, matchLength] = match("d+", str);

    expect(matched).toBe(false);
  });

  it("operator question", () => {
    let str = "bqq";
    const [matched, matchPos, matchLength] = match("ba?", str);
    str = str.slice(matchPos, matchPos + matchLength);
    expect(str).toBe("b");
  });

  it("using complex regexp", () => {
    let str = "Stefan Vovk";
    const [matched, matchPos, matchLength] = match(
      "[A-Z][a-z]+ [A-Z][a-z]+",
      str
    );
    str = str.slice(matchPos, matchPos + matchLength);
    expect(str).toBe("Stefan Vovk");
  });

  it("using complex regexp 2", () => {
    let str = "Stefan Vovk";
    const [matched, matchPos, matchLength] = match("\\a+", str);
    str = str.slice(matchPos, matchPos + matchLength);
    expect(str).toBe("Stefan");
  });

  it("backtrack", () => {
    let str = "booo oscar";
    const [matched, matchPos, matchLength] = match("bo*\\bo.*", str);
    str = str.slice(matchPos, matchPos + matchLength);
    expect(str).toBe("booo oscar");
  });

  it("exactly 3", () => {
    let str = "booo oscar";
    const [matched, matchPos, matchLength] = match("o{3}", str);
    str = str.slice(matchPos, matchPos + matchLength);
    expect(str).toBe("ooo");
  });

  it("more than 3", () => {
    let str = "boo oscar";
    const [matched, matchPos, matchLength] = match("o{3,}", str);
    str = str.slice(matchPos, matchPos + matchLength);
    expect(matched).toBe(false);
  });

  it("from 3 to 5", () => {
    let str = "booooo oscar";
    const [matched, matchPos, matchLength] = match("bo{3,5}", str);
    str = str.slice(matchPos, matchPos + matchLength);
    expect(str).toBe("booooo");
  });

  it("word with length 5", () => {
    let str = "boooo oscar";
    const [matched, matchPos, matchLength] = match("\\b\\a{5}\\b", str);
    str = str.slice(matchPos, matchPos + matchLength);
    str = str.trim();
    expect(str).toBe("boooo");
  });

  it("5 digits or 5 letters", () => {
    let str = "1234 oscar";
    const [matched, matchPos, matchLength] = match("(\\d{5}|\\a{5})", str);
    str = str.slice(matchPos, matchPos + matchLength);

    expect(str).toBe("oscar");
  });
});
