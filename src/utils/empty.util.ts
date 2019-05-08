import {ArrayUtil} from "./array.util";
import {ObjectUtil} from "./object.util";

export class EmptyUtil {
    public static isNullOrUndefined(value: any): boolean {
        return !value || value === null;
    }

    public static isAPopulatedArrayOrObject(value: any): boolean {
        return !EmptyUtil.isNullOrUndefined(value) &&
            ObjectUtil.isObject(value) &&
            ArrayUtil.isArray(value);
    }
}
