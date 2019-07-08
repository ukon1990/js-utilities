import {ArrayUtil} from "./array.util";
import {ObjectUtil} from "./object.util";

export class EmptyUtil {
    public static isNullOrUndefined(value: any, value2?: any): boolean {
        return (!value && isNaN(value)) || value === null &&
            (!value && isNaN(value2)) || value2 === null;
    }

    public static isAPopulatedArrayOrObject(value: any): boolean {
        return ObjectUtil.isPopulatedObject(value) || ArrayUtil.isPopulatedArray(value);
    }
}
