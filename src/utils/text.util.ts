import {Match} from '../models/match.model';
import {EmptyUtil} from "./empty.util";

export class TextUtil {
    public static isEmpty(source: string | any): boolean {
        if (!source && isNaN(source)) return true;
        if (source === null) return true;
        if (source.length === 0) return true;
        return false;
    }

    public static contains(source: string, contains: string): boolean {
        if (TextUtil.isSourceOrContainsNullOrUndefined(source, contains)) {
            return false;
        }
        return source.toLowerCase().indexOf(contains.toLowerCase()) > -1;
    }

    public static getIndexOf(source: string, contains: string): number {
        if (TextUtil.isSourceOrContainsNullOrUndefined(source, contains)) {
            return -1;
        }
        return source.toLowerCase().indexOf(contains.toLowerCase());
    }

    private static isSourceOrContainsNullOrUndefined(source: string, contains: string): boolean {
        return EmptyUtil.isNullOrUndefined(source) || EmptyUtil.isNullOrUndefined(contains);
    }

    public static getMatchingParts(string: string, matchingString: string): Match {
        const match = new Match('', '', '');
        let firstIndex = 0;

        if (EmptyUtil.isNullOrUndefined(string)) {
            return match;
        }

        firstIndex = TextUtil.setFirstMatchPartAndIndex(
            firstIndex, string, matchingString, match);

        TextUtil.setMatchingParts(
            firstIndex, string, match, matchingString);

        return match;
    }

    private static setFirstMatchPartAndIndex(
        firstIndex: number, string: string, matchingString: string, match: Match) {
        firstIndex = TextUtil.getIndexOf(string, matchingString);

        if (firstIndex === -1) {
            firstIndex = 0;
        }

        match.start = string.slice(0, firstIndex);
        return firstIndex;
    }

    private static setMatchingParts(
        firstIndex: number, string: string, match: Match, matchingString: string) {
        for (let i = firstIndex, x = string.length; i < x; i++) {
            if (match.match.toLowerCase() === matchingString.toLowerCase()) {
                match.end += string[i];
            } else {
                match.match += string[i];
            }
        }
    }

    public static isLowerCase(text: string): boolean {
        return text === text.toLowerCase() && text !== text.toUpperCase();
    }
}
