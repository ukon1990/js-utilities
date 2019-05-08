import {ObjectUtil} from './object.util';
import {Difference} from "../models/difference.model";

export class CompareUtil {

    public static objectEquality(object1: Object, object2: Object): boolean {
        return CompareUtil.objectDifference(object1, object2).length === 0;
    }

    public static objectDifference(object1: object | any, object2: object | any, ignoreFields?: any): Array<Difference> {
        const differences = new Array<Difference>();
        if (!object1 || object1 === null || !object2 || object2 === null) {
            differences.push(new Difference('array', object1, object2));
        } else {
            Object.keys(object1).forEach(n => {
                if (ignoreFields && ignoreFields[n]) {
                    return;
                }
                CompareUtil.setDifferences(n, object1[n], object2[n], differences);
            });
        }
        return differences;
    }

    public static arrayEquality(array1: Array<any>, array2: Array<any>): boolean {
        return CompareUtil.arrayDifference(array1, array2).length === 0;
    }

    public static arrayDifference(array1: Array<any>, array2: Array<any>): Array<any> {
        const differences = new Array<Difference>();

        if (!array1 || array1 === null || !array2 || array2 === null) {
            differences.push(new Difference('array', array1, array2));
        } else {
            array1.forEach((n, i) =>
                CompareUtil.setDifferences(i, array1[i], array2[i], differences));
        }
        return differences;
    }

    private static setDifferences(key: any, value1: any, value2: any, differences: Array<Difference>): void {
        if (CompareUtil.isNullAndUndefined(value1, value2)) {
            return;
        }

        if (CompareUtil.isNullOrUndefined(value1, value2)) {
            CompareUtil.handleNullOrUndefined(key, value1, value2, differences);
        } else if (ObjectUtil.isAPopulatedObject(value1)) {
            const childDifference = new Difference(
                key, value1, value2, CompareUtil.arrayDifference(value1, value2));

            if (CompareUtil.hasChildren(childDifference)) {
                differences.push(childDifference);
            }
        } else if (ObjectUtil.isObject(value1)) {
            const childDifference = new Difference(
                key, value1, value2, CompareUtil.objectDifference(value1, value2));

            if (CompareUtil.hasChildren(childDifference)) {
                differences.push(childDifference);
            }
        } else if (value1 !== value2) {
            differences.push(
                new Difference(key, value1, value2));
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

    private static isEmptyString(value1: any, value2: any): boolean {
        return value1 === '' || value2 === '';
    }
}
