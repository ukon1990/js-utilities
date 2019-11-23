import { Match } from "../models/match.model";
import { EmptyUtil } from "./empty.util";
import { CSVOptions } from "../models/csv-options.model";

export class TextUtil {
  static toSlug(text: string): any {
    return text
      .toLowerCase()
      .replace(/[ ]{1,9999}/g, "-")
      .replace(/[^a-zA-Z0-9-]{1,9999}/g, "");
  }
  /**
   * Checks if a string is null, undefined or has a length of 0.
   */
  public static isEmpty(source: string | any): boolean {
    if (!source && isNaN(source)) {
      return true;
    }
    if (source === null) {
      return true;
    }
    if (source.length === 0) {
      return true;
    }
    return false;
  }

  /**
   * Checks if two strings are equal regardless of case
   */
  public static isEqualIgnoreCase(
    text1: string | any,
    text2: string | any
  ): boolean {
    if (this.isEmpty(text1) && this.isEmpty(text2)) {
      return true;
    }
    if (this.isEmpty(text1) || this.isEmpty(text2)) {
      return false;
    }
    return text1.toLowerCase() === text2.toLowerCase();
  }

  /**
   * Checks if a string exists within another. This is case-insensitive.
   */
  public static contains(source: string, contains: string): boolean {
    if (TextUtil.isSourceOrContainsNullOrUndefined(source, contains)) {
      return false;
    }
    return source.toLowerCase().indexOf(contains.toLowerCase()) > -1;
  }

  /**
   * Is basically `sourceString.toLowerCase().indexOf(targetString.toLowerCase)`
   */
  public static getIndexOf(source: string, contains: string): number {
    if (TextUtil.isSourceOrContainsNullOrUndefined(source, contains)) {
      return -1;
    }
    return source.toLowerCase().indexOf(contains.toLowerCase());
  }

  private static isSourceOrContainsNullOrUndefined(
    source: string,
    contains: string
  ): boolean {
    return (
      EmptyUtil.isNullOrUndefined(source) ||
      EmptyUtil.isNullOrUndefined(contains)
    );
  }

  /**
   * Returns a Match object. The Match object for `getMatchingParts('Chicken', 'ck')`
   * looks like this `{start: 'Chi', match: 'ck', end: 'en'}`.
   *
   * This could be used for autocomplete search lists, making it easy to emphasis the matching part of the string.
   * it is case insensitive.
   * @param text The source
   * @param matchingString The 'query' string
   */
  public static getMatchingParts(text: string, matchingString: string): Match {
    const match = new Match("", "", "");
    let firstIndex = 0;

    if (EmptyUtil.isNullOrUndefined(text)) {
      return match;
    }

    if (EmptyUtil.isNullOrUndefined(matchingString)) {
      matchingString = "";
    }

    firstIndex = TextUtil.setFirstMatchPartAndIndex(
      firstIndex,
      text,
      matchingString,
      match
    );

    TextUtil.setMatchingParts(firstIndex, text, match, matchingString);

    return match;
  }

  private static setFirstMatchPartAndIndex(
    firstIndex: number,
    text: string,
    matchingString: string,
    match: Match
  ) {
    firstIndex = TextUtil.getIndexOf(text, matchingString);

    if (firstIndex === -1) {
      firstIndex = 0;
    }

    match.start = text.slice(0, firstIndex);
    return firstIndex;
  }

  private static setMatchingParts(
    firstIndex: number,
    text: string,
    match: Match,
    matchingString: string
  ) {
    for (let i = firstIndex, x = text.length; i < x; i++) {
      if (match.match.toLowerCase() === matchingString.toLowerCase()) {
        match.end += text[i];
      } else {
        match.match += text[i];
      }
    }
  }

  /**
   * Converting sentences with spaces into camelCase sentenes
   * @param sentence The sentence to be converted.
   * @param upperCase? If it is UpperCamelCase or not
   */
  public static sentenceToCamelCase(
    sentence: string,
    upperCase?: boolean
  ): string {
    const list = sentence.split(" ");
    let camelCase = "";
    list.forEach((word: string, index: number) => {
      word = word.replace(/[^\w ]+/g, "");

      if (index === 0 && !upperCase) {
        camelCase += word.toLowerCase();
      } else {
        camelCase +=
          word.slice(0, 1).toUpperCase() + word.slice(1, word.length);
      }
    });
    return camelCase;
  }

  /**
   * Converts a camelCase sentence to a sentence with spaces.
   * @param sentence The sentence to be converted.
   */
  public static camelCaseToSentence(sentence: string): string {
    sentence = sentence
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3");

    sentence = sentence
      .split(" ")
      .map(this.handleWordForCamelCaseToSentence)
      .join(" ");
    return sentence;
  }

  private static handleWordForCamelCaseToSentence(word: string, index: number) {
    word = word.toLowerCase();
    if (index === 0) {
      word = word.slice(0, 1).toUpperCase() + word.slice(1, word.length);
    }
    return word;
  }

  /**
   * Checks if a string is all lowercase.
   */
  public static isLowerCase(text: string): boolean {
    return text === text.toLowerCase() && text !== text.toUpperCase();
  }

  /**
   * Checks if a string is all uppercase.
   */
  public static isUpperCase(text: string): boolean {
    return text === text.toUpperCase() && text !== text.toLowerCase();
  }

  /**
   * Converts an array of objects to a CSV string.
   * @param list an array of objects
   * @param delimiter the separation character to use. If none are provided, comma will be used.
   * @param useKeys The keys from the object to use. If not provided, all the keys will be used.
   *                  Providing a list of keys will improve performance.
   */
  public static objectsToCSV(
    list: any[],
    delimiter: string = ",",
    useKeys?: string[]
  ): string {
    let body = "";
    const keyMap = {};

    if (useKeys) {
      useKeys.forEach(key => (keyMap[key] = true));
    }

    list.forEach(
      obj =>
        (body = this.handleObjectToCSVRow(
          useKeys,
          obj,
          keyMap,
          delimiter,
          body
        ))
    );

    useKeys = Object.keys(keyMap).map(key => this.camelCaseToSentence(key));

    return `${useKeys.join(delimiter)}\n\r${body}`;
  }

  private static handleObjectToCSVRow(
    useKeys: string[],
    obj,
    keyMap,
    delimiter: string,
    body: string
  ) {
    if (!useKeys) {
      Object.keys(obj).forEach(key => (keyMap[key] = true));
    }
    let row = "";
    row += Object.keys(keyMap)
      .map((key: string) => obj[key])
      .join(delimiter);

    body += row + "\n\r";
    return body;
  }

  /**
   *
   * @param input The input string
   * @param delimiter whatever character the columns are separated by
   * @param options The options are optional, and needs to be in the same order as the columns are.
   */
  public static csvToObjects<T>(
    input: string,
    delimiter: string = ",",
    options: CSVOptions = new CSVOptions()
  ): T[] {
    const result: T[] = [],
      rows = input.split(/[\n\r]/g);

    rows.forEach((row: string, index: number) =>
      this.handleCSVRow(row, index, options, delimiter, result)
    );
    return result;
  }

  private static handleCSVRow<T>(
    row: string,
    index: number,
    options: CSVOptions,
    delimiter: string,
    result: T[]
  ) {
    if (row !== "") {
      if (
        index === 0 &&
        (!options.headerNames || !options.headerNames.length)
      ) {
        this.handleHeaderRow(row, delimiter, options);
      } else {
        result.push(this.handleCSVRowColumns<T>(row, delimiter, options));
      }
    }
  }

  private static handleHeaderRow(
    row: string,
    delimiter: string,
    options: CSVOptions
  ): void {
    options.headerNames = row
      .split(delimiter)
      .map(text => this.sentenceToCamelCase(text));
  }

  private static handleCSVRowColumns<T>(
    row: string,
    delimiter: string,
    options: CSVOptions
  ): T {
    const obj = {};
    const doSetTypes = !options || !options.types || !options.types.length;

    if (doSetTypes && !options) {
      options = new CSVOptions();
    } else if (doSetTypes) {
      options.types = [];
    }

    row.split(delimiter).forEach((column: any, index: number) => {
      if (doSetTypes) {
        this.getColumnType(column, options.types);
      }
      obj[options.headerNames[index]] = this.getCSVColumnWithCorrectType(
        column,
        options.types[index]
      );
    });
    return obj as T;
  }

  private static getColumnType(column: any, types: string[]): void {
    if (!isNaN(column)) {
      types.push("number");
    } else if (column === "true" || column === "false") {
      types.push("boolean");
    } else {
      types.push("string");
    }
  }

  private static getCSVColumnWithCorrectType(column: any, type: string): any {
    switch (type) {
      case "number":
        return +column;
      case "boolean":
        return (
          column === "true" || column === 1 || column.toLowerCase() === "yes"
        );
      default:
        return column;
    }
  }
}
