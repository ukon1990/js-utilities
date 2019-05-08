import {EmptyUtil} from "./empty.util";
import {ArrayUtil} from "./array.util";
import {Difference} from "../models/difference.model";
import {CompareUtil} from "./compare.util";

export class ObjectUtil {

    public static isObject(value: any): boolean {
        return !EmptyUtil.isNullOrUndefined(value) &&
            typeof value === 'object' &&
            !value.forEach && !value.push;
    }

    public static overwrite(from: object | any, to: object | any): void {
        if (EmptyUtil.isNullOrUndefined(from)) {
            console.error( 'Could not overwrite an object because the source is null or undefined');
            return;
        }

        Object.keys(from).forEach(key => {
            ObjectUtil.overwriteField(from, key, to);
        });
    }

    private static overwriteField(from: object | any, key: string, to: object | any) {
        if (ArrayUtil.isArray(from[key]) && to) {
            to[key] = ObjectUtil.clone(from[key]);
        } else if (ObjectUtil.isObject(from[key]) && to) {
            to[key] = ObjectUtil.overwrite(from[key], to[key]);
        } else {
            try {
                to[key] = from[key];
            } catch (e) {
            }
        }
    }

    public static clone(object: any): object {
        if (EmptyUtil.isNullOrUndefined(object)) {
            console.error('Could not clone an object because the source is null or undefined');
            return object;
        }

        const obj: any = {};
        Object.keys(object).forEach(key => {
            ObjectUtil.cloneField(object, key, obj);
        });
        return obj;
    }

    private static cloneField(object: any, key: string, obj: any) {
        if (ArrayUtil.isArray(object[key])) {
            obj[key] = ArrayUtil.clone(object[key]);
        } else if (ObjectUtil.isObject(object[key])) {
            obj[key] = ObjectUtil.clone(object[key]);
        } else {
            obj[key] = object[key];
        }
    }

    public static isEqual(object1: Object, object2: Object): boolean {
        return ObjectUtil.getDifference(object1, object2).length === 0;
    }

    public static getDifference(object1: object | any, object2: object | any, ignoreFields?: any): Array<Difference> {
        const differences = new Array<Difference>();
        if (EmptyUtil.isNullOrUndefined(object1) || EmptyUtil.isNullOrUndefined(object2)) {
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
}
