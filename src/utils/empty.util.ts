import {ArrayUtil} from './array.util';
import {ObjectUtil} from './object.util';

export class EmptyUtil {
    /**
     * Checks if all the input is null or undefined.
     */
    public static isNullOrUndefined(value: any, value2?: any): boolean {
        return (value === undefined && isNaN(value)) || value === null &&
            (value2 === undefined && isNaN(value2)) || value2 === null;
    }

    /**
     * Checks if a value is a populated array or object
     */
    public static isAPopulatedArrayOrObject(value: any): boolean {
        return ObjectUtil.isPopulatedObject(value) || ArrayUtil.isPopulatedArray(value);
    }
}
