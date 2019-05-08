export class ObjectUtil {

    public static isNullOrUndefined(value: any): boolean {
        return !value || value === null;
    }

    public static isObject(value: any): boolean {
        return !ObjectUtil.isNullOrUndefined(value) &&
            typeof value === 'object' &&
            !value.forEach && !value.push;
    }

    public static isArray(value: any): boolean {
        return !ObjectUtil.isNullOrUndefined(value) &&
            typeof value === 'object' &&
            value.forEach && value.push;
    }

    public static isAPopulatedObject(value: any): boolean {
        return !ObjectUtil.isNullOrUndefined(value) &&
            typeof value === 'object' &&
            !ObjectUtil.isArray(value);
    }

    public static overwrite(from: object | any, to: object | any): void {
        if (ObjectUtil.isNullOrUndefined(from)) {
            console.error( 'Could not overwrite an object because the source is null or undefined');
            return;
        }

        Object.keys(from).forEach(key => {
            if (ObjectUtil.isAPopulatedObject(from[key]) && to) {
                to[key] = ObjectUtil.cloneArray(from[key]);
            } else if (ObjectUtil.isObject(from[key]) && to) {
                to[key] = ObjectUtil.overwrite(from[key], to[key]);
            } else {
                try {
                    to[key] = from[key];
                } catch (e) {
                }
            }
        });
    }

    public static clone(object: any): object {
        if (ObjectUtil.isNullOrUndefined(object)) {
            console.error('Could not clone an object because the source is null or undefined');
            return object;
        }

        const obj: any = {};
        Object.keys(object).forEach(key => {
            if (ObjectUtil.isAPopulatedObject(object[key])) {
                obj[key] = ObjectUtil.cloneArray(object[key]);
            } else if (ObjectUtil.isObject(object[key])) {
                obj[key] = ObjectUtil.clone(object[key]);
            } else {
                obj[key] = object[key];
            }
        });
        return obj;
    }

    public static cloneArray(array: Array<any>): Array<any> {
        if (ObjectUtil.isNullOrUndefined(array)) {
            console.error('Could not clone an array because it is null or undefined');
            return array;
        }

        const newArray = Array<any>();
        array.forEach(value => {
            if (ObjectUtil.isAPopulatedObject(value)) {
                newArray.push(ObjectUtil.cloneArray(value));
            } else if (ObjectUtil.isObject(value)) {
                newArray.push(ObjectUtil.clone(value));
            } else {
                newArray.push(value);
            }
        });
        return newArray;
    }
}
