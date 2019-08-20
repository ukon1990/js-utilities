import {EmptyUtil} from './empty.util';
import {ObjectUtil} from './object.util';
import {Difference} from '../models/difference.model';
import {CompareUtil} from './compare.util';

export class ArrayUtil {
    /**
    * Checks if a value is an object and not array
    */
    public static isArray(value: any): boolean {
        return !EmptyUtil.isNullOrUndefined(value) &&
            typeof value === 'object' &&
            value.forEach && value.push;
    }

    /**
    * Returns true if an array is populated
    */
    public static isPopulatedArray(value: any): boolean {
        return ArrayUtil.isArray(value) && Object.keys(value).length > 0;
    }

    /**
     * Returns a cloned version of an array. Removing all child object references.
     */
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

    private static cloneField(value: any, newArray: any[]) {
        if (ArrayUtil.isArray(value)) {
            newArray.push(ArrayUtil.clone(value));
        } else if (ObjectUtil.isObject(value)) {
            newArray.push(ObjectUtil.clone(value));
        } else {
            newArray.push(value);
        }
    }

    /**
     * Checks if two arrays are equal regardless of object reference.
     */
    public static isEqual(array1: Array<any>, array2: Array<any>): boolean {
        return ArrayUtil.getDifference(array1, array2).length === 0;
    }

    /**
     * Returns an array of differences as `Difference` objects.
     */
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

    /**
     * Removes any duplicate entries from an array.
     * May fail, if you provide it with anything that can't be JSON.stringified
     */
    public static removeDuplicates(fromArray: any[]) {
        const map = {};
        const removeIndexes = [];
        fromArray.forEach((value, index) => {
            const id = JSON.stringify(value);
            if (map[id]) {
                removeIndexes.push(index);
            } else {
                map[id] = true;
            }
        });

        ArrayUtil.removeIndexes(removeIndexes, fromArray);
    }

    /**
     * Removes all entries that is identical to a value from an array, 
     * regardless of the object reference.
     * @param value The value to be removed from the array.
     * @param fromArray 
     */
    public static removeObject(value: any, fromArray: any[]): void {
        const removeIndexes = [];
        fromArray.forEach((v, index) => {
            let equal = false;
            if (ObjectUtil.isObject(value) && ObjectUtil.isEqual(v, value)) {
                equal = true;
            } else if (ArrayUtil.isArray(value) && ArrayUtil.isEqual(v, value)) {
                equal = true;
            } else if (v === value) {
                equal = true;
            }

            if (equal) {
                removeIndexes.push(index);
            }
        });
        ArrayUtil.removeIndexes(removeIndexes, fromArray);
    }
    
    /**
     * Removes multiple objects/values from an array.
     * @param values A list of objects or values to be removed
     * @param fromArray 
     */
    public static removeObjects(values: any[], fromArray: any[]): void {
        values.forEach(value =>
            ArrayUtil.removeObject(value, fromArray));
    }

    /**
     * Removes the elements from an array at the supplied index locations
     */
    public static removeIndexes(indexes: number[], fromArray: any[]): void {
        indexes.sort(
            (a, b) => b - a)
        .forEach(i =>
            fromArray.splice(i, 1));
    }

    /**
     * Returns an array with the items in the provided array in random order.
     * @param array The array
     */
    public static randomOrder(array: any[]): any[] {
        const random = [];
        const tmp = [...array];
        for(let i = 0, length = array.length; i < length; i++) {
            let index = Math.round(Math.random() * tmp.length - 1);

            if (index < 0) {
                index = 0;
            }

            random.push(tmp[index]);
            ArrayUtil.removeIndexes([index], tmp);
        }
        return random;
    }
}
