import {EmptyUtil} from "./empty.util";
import {ObjectUtil} from "./object.util";
import {Difference} from "../models/difference.model";
import {CompareUtil} from "./compare.util";

export class ArrayUtil {
    public static isArray(value: any): boolean {
        return !EmptyUtil.isNullOrUndefined(value) &&
            typeof value === 'object' &&
            value.forEach && value.push;
    }

    public static isPopulatedArray(value: any): boolean {
        return ArrayUtil.isArray(value) && Object.keys(value).length > 0;
    }

    public static clone(array: Array<any>): Array<any> {
        if (EmptyUtil.isNullOrUndefined(array)) {
            console.error('Could not clone an array because it is null or undefined');
            return array;
        }

        const newArray = Array<any>();
        array.forEach(value => {
            ArrayUtil.cloneField(value, newArray);
        });
        return newArray;
    }

    private static cloneField(value: any, newArray: any) {
        if (ArrayUtil.isArray(value)) {
            newArray.push(ArrayUtil.clone(value));
        } else if (ObjectUtil.isObject(value)) {
            newArray.push(ObjectUtil.clone(value));
        } else {
            newArray.push(value);
        }
    }

    public static isEqual(array1: Array<any>, array2: Array<any>): boolean {
        return ArrayUtil.getDifference(array1, array2).length === 0;
    }

    public static getDifference(array1: Array<any>, array2: Array<any>): Array<any> {
        const differences = new Array<Difference>();

        if (EmptyUtil.isNullOrUndefined(array1) || EmptyUtil.isNullOrUndefined(array2)) {
            differences.push(new Difference('array', array1, array2));
        } else {
            array1.forEach((n, i) =>
                CompareUtil.setDifferences(i, array1[i], array2[i], differences));
        }
        return differences;
    }
}
