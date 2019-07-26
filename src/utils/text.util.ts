import {Match} from '../models/match.model';
import {EmptyUtil} from './empty.util';

export class TextUtil {
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

    private static isSourceOrContainsNullOrUndefined(source: string, contains: string): boolean {
        return EmptyUtil.isNullOrUndefined(source) || EmptyUtil.isNullOrUndefined(contains);
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
        const match = new Match('', '', '');
        let firstIndex = 0;

        if (EmptyUtil.isNullOrUndefined(text)) {
            return match;
        }

        if (EmptyUtil.isNullOrUndefined(matchingString)) {
            matchingString = '';
        }

        firstIndex = TextUtil.setFirstMatchPartAndIndex(
            firstIndex, text, matchingString, match);

        TextUtil.setMatchingParts(
            firstIndex, text, match, matchingString);

        return match;
    }

    private static setFirstMatchPartAndIndex(
        firstIndex: number, text: string, matchingString: string, match: Match) {
        firstIndex = TextUtil.getIndexOf(text, matchingString);

        if (firstIndex === -1) {
            firstIndex = 0;
        }

        match.start = text.slice(0, firstIndex);
        return firstIndex;
    }

    private static setMatchingParts(
        firstIndex: number, text: string, match: Match, matchingString: string) {
        for (let i = firstIndex, x = text.length; i < x; i++) {
            if (match.match.toLowerCase() === matchingString.toLowerCase()) {
                match.end += text[i];
            } else {
                match.match += text[i];
            }
        }
    }

    /**
     * Checks if a string is upper or lowercase.
     */
    public static isLowerCase(text: string): boolean {
        return text === text.toLowerCase() && text !== text.toUpperCase();
    }

    public static csvToObjects<T>(input: string, delimiter: string, options?: {headerNames: string[]}): T[] {
        const result: T[] = [],
            rows = input.split(/\n/g);
        
        rows.forEach((row: string, index: number) => {
            if (index === 0 && !options || !options.headerNames) {
                options = {headerNames: []};
                options.headerNames = row.split(delimiter);
            } else {
                result.push(this.handleCSVRow<T>(row, delimiter, options.headerNames));
            }
        });
        return result;
    }

    private static handleCSVRow<T>(row: string, delimiter: string, headerNames: string[]): T {
        const obj = {};
        // TODO: Determine the datatype
        row.split(delimiter)
            .forEach((column: any, index: number) => {
                obj[headerNames[index]] = column;
            });
        return obj as T;
    }
}
