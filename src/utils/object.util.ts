import {EmptyUtil} from './empty.util';
import {ArrayUtil} from './array.util';
import {Difference} from '../models/difference.model';
import {CompareUtil} from './compare.util';

export class ObjectUtil {

    /**
     * Checks if a value is an object and not array
     */
    public static isObject(value: any): boolean {
        return !EmptyUtil.isNullOrUndefined(value) &&
            typeof value === 'object' &&
            !value.forEach && !value.push;
    }

    /**
     * Returns true if an object is populated
     */
    public static isPopulatedObject(value: any): boolean {
        return ObjectUtil.isObject(value) && Object.keys(value).length > 0;
    }

    /**
     * Overwrites the values in the "to" object, with values on
     * the same key as the "from" object.
     * @param from Object to copy values from
     * @param to Object to overwrite existing values from
     */
    public static overwrite(from: object | any, to: object | any, doNotMutate: boolean = false): object {
        if (doNotMutate) {
            to = this.clone(to);
        }

        if (EmptyUtil.isNullOrUndefined(from)) {
            console.error('Could not overwrite an object because the source is null or undefined');
            return;
        }

        Object.keys(from).forEach(key => {
            ObjectUtil.overwriteField(from, key, to);
        });
        return to;
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
                to[key] = null;
            }
        }
    }

    /**
     * Returns a cloned version of an object. Removing all child object references.
     */
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

    private static cloneField(object: any, key: string, targetObject: any | any[]) {
        if (ArrayUtil.isArray(object[key])) {
            targetObject[key] = ArrayUtil.clone(object[key]);
        } else if (ObjectUtil.isObject(object[key])) {
            targetObject[key] = ObjectUtil.clone(object[key]);
        } else {
            targetObject[key] = object[key];
        }
    }

    /**
     * An alternative to using JSON.stringify for comparing two objects.
     * Stringify can some times have issues with certain objects.
     * @param object1
     * @param object2
     */
    public static isEqual(object1: object, object2: object): boolean {
        return ObjectUtil.getDifference(object1, object2).length === 0;
    }

    /**
     * Returns an array of object differences as `Difference` objects.
     * @param object1
     * @param object2
     * @param ignoreFields The fields you wish to be ignored: e.g ['hobby', 'profession']
     * @param onlyFields The fields you wish to be considered: e.g ['name', 'age']
     */
    public static getDifference(object1: object | any, object2: object | any,
                                ignoreFields?: any, onlyFields?: string[]): Array<Difference> {
        const differences = new Array<Difference>(),
        onlyFieldsMap = new Map<string, boolean>();

        ignoreFields = this.getIgnoreFields(ignoreFields, onlyFields, onlyFieldsMap);

        if (EmptyUtil.isNullOrUndefined(object1) || EmptyUtil.isNullOrUndefined(object2)) {
            differences.push(new Difference('array', object1, object2));
        } else {
            this.processKeys(object1, ignoreFields, onlyFields, onlyFieldsMap, object2, differences);
        }
        return differences;
    }

    private static processKeys(object1: object | any, ignoreFields: any,
                               onlyFields: string[], onlyFieldsMap: Map<string, boolean>, object2: object | any, differences) {
        Object.keys(object1).forEach(field => {
            if (ignoreFields && ignoreFields[field]) {
                return;
            } else if (this.shouldProcessField(onlyFields, onlyFieldsMap, field)) {
                CompareUtil.setDifferences(field, object1[field], object2[field], differences);
            }
        });
    }

    private static shouldProcessField(onlyFields: string[], onlyFieldsMap: Map<string, boolean>, field) {
        return !onlyFields || onlyFields && onlyFieldsMap.get(field);
    }

    private static getIgnoreFields(ignoreFields: any, onlyFields: string[], onlyFieldsMap) {
        if (ignoreFields && ArrayUtil.isArray(ignoreFields)) {
            const fields = new Map<string, boolean>();
            ignoreFields
                .forEach((field: string) =>
                    fields.set(field, true));
            ignoreFields = fields;
        }

        if (onlyFields) {
            onlyFields.forEach((field: string) =>
                onlyFieldsMap.set(field, true));
        }
        return ignoreFields;
    }
}
