import {Match} from '../models/match.model';
import {ObjectUtil} from "./object.util";

export class TextUtil {

    public static contains(source: string, target: string): boolean {
        if (ObjectUtil.isNullOrUndefined(source) || ObjectUtil.isNullOrUndefined(target)) {
            return false;
        }
        return source.toLowerCase().indexOf(target.toLowerCase()) > -1;
    }

    public static getIndexOf(source: string, target: string): number {
        if (!source || !target) {
            return -1;
        }
        return source.toLowerCase().indexOf(target.toLowerCase());
    }

    public static matchingParts(string: string, matchingString: string): Match {
        const match = new Match('', '', '');
        let firstIndex = TextUtil.getIndexOf(string, matchingString);

        if (!string) {
            return match;
        }

        if (firstIndex === -1) {
            firstIndex = 0;
        }
        match.start = string.slice(0, firstIndex);

        for (let i = firstIndex, x = string.length; i < x; i++) {
            if (match.match.toLowerCase() === matchingString.toLowerCase()) {
                match.end += string[i];
            } else {
                match.match += string[i];
            }
        }
        return match;
    }

    public static isLowerCase(text: string): boolean {
        return text === text.toLowerCase() && text !== text.toUpperCase();
    }
}
