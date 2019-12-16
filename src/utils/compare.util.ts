import {ObjectUtil} from './object.util';
import {Difference} from '..';
import {ArrayUtil} from './array.util';

export class CompareUtil {
    static setDifferences(key: any, value1: any, value2: any, differences: Array<Difference>,
                          ignoreFields?: any, onlyFields?: string[],
                          checkForCyclicDependencies = true, parentStackMap?): void {
        if (CompareUtil.isNullAndUndefined(value1, value2)) {
            return;
        }

        if (CompareUtil.isNullOrUndefined(value1, value2)) {
            this.handleNullOrUndefined(key, value1, value2, differences);
        } else if (ArrayUtil.isArray(value1) || ArrayUtil.isArray(value2)) {
            this.handleArray(key, value1, value2, differences);
        } else if (ObjectUtil.isObject(value1) || ObjectUtil.isObject(value2)) {
            this.handleObject(key, value1, value2, differences, ignoreFields, onlyFields,
                checkForCyclicDependencies, parentStackMap);
        } else if (value1 !== value2) {
            differences.push(
                new Difference(key, value1, value2));
        }
    }

    private static handleArray(key: any, value1: any, value2: any, differences: Array<Difference>) {
        const childDifference = new Difference(
            key, value1, value2, ArrayUtil.getDifference(value1, value2));

        if (CompareUtil.hasChildren(childDifference)) {
            differences.push(childDifference);
        }
    }

    private static handleObject(key: any, value1: any, value2: any, differences: Array<Difference>,
                                ignoreFields: any, onlyFields: string[],
                                checkForCyclicDependencies: boolean, parentStackMap: any) {
        if (checkForCyclicDependencies) {
            if (!parentStackMap) {
                parentStackMap = [];
            }

            parentStackMap[key] = parentStackMap[key] ?
                parentStackMap[key] + 1 : 1;

            if (parentStackMap[key] > 5) {
                return;
            }
        }

        const childDifference = new Difference(
            key, value1, value2, ObjectUtil.getDifference(
                value1, value2, ignoreFields, onlyFields,
                checkForCyclicDependencies, parentStackMap));

        if (CompareUtil.hasChildren(childDifference)) {
            differences.push(childDifference);
        }
    }

    private static handleNullOrUndefined(key: any, value1: any, value2: any, differences: Array<Difference>) {
        if (value1 === value2) {
            return;
        }
        differences.push(
            new Difference(key, value1, value2));
    }

    private static hasChildren(difference: Difference): boolean {
        return !!(difference.children && difference.children.length > 0);
    }

    public static isNullOrUndefined(value1: any, value2: any): boolean {
        return CompareUtil.isNull(value1, value2) || CompareUtil.isUndefined(value1, value2);
    }

    private static isNull(value1: any, value2: any): boolean {
        return value1 === null || value2 === null;
    }

    private static isUndefined(value1: any, value2: any): boolean {
        return value1 === undefined || value2 === undefined;
    }

    private static isNullAndUndefined(value1: any, value2: any): boolean {
        return (value1 === null && value2 === undefined) ||
            (value1 === undefined && value2 === null) ||
            (CompareUtil.isEmptyString(value1, value2) && (CompareUtil.isNull(value1, value2) || CompareUtil.isUndefined(value1, value2)));
    }

    private static isEmptyString(value1: any, value2?: any): boolean {
        return value1 === '' || value2 === '';
    }
}
