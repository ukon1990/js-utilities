import { EmptyUtil } from './empty.util';

describe('EmptyUtil', () => {
    describe('isNullOrUndefined', () => {
        it('Null returns true', () => {
            expect(EmptyUtil.isNullOrUndefined(null)).toBeTruthy();
            expect(EmptyUtil.isNullOrUndefined(null, null)).toBeTruthy();
        });

        it('Undefined returns true', () => {
            expect(EmptyUtil.isNullOrUndefined(undefined)).toBeTruthy();
            expect(EmptyUtil.isNullOrUndefined(undefined, undefined)).toBeTruthy();
        });

        it('Anything else returns as false', () => {
            expect(EmptyUtil.isNullOrUndefined('undefined')).toBeFalsy();
            expect(EmptyUtil.isNullOrUndefined(0)).toBeFalsy();
            expect(EmptyUtil.isNullOrUndefined(-1)).toBeFalsy();
            expect(EmptyUtil.isNullOrUndefined(true)).toBeFalsy();
            expect(EmptyUtil.isNullOrUndefined(false)).toBeFalsy();
            expect(EmptyUtil.isNullOrUndefined({})).toBeFalsy();
            expect(EmptyUtil.isNullOrUndefined([])).toBeFalsy();
        });
    });

    it('isAPopulatedArrayOrObject', () => {
        expect(EmptyUtil.isAPopulatedArrayOrObject({name: ''})).toBeTruthy();
        expect(EmptyUtil.isAPopulatedArrayOrObject([''])).toBeTruthy();

        expect(EmptyUtil.isAPopulatedArrayOrObject({})).toBeFalsy();
        expect(EmptyUtil.isAPopulatedArrayOrObject([])).toBeFalsy();
        expect(EmptyUtil.isAPopulatedArrayOrObject(null)).toBeFalsy();
        expect(EmptyUtil.isAPopulatedArrayOrObject(undefined)).toBeFalsy();
        expect(EmptyUtil.isAPopulatedArrayOrObject(NaN)).toBeFalsy();
        expect(EmptyUtil.isAPopulatedArrayOrObject(0)).toBeFalsy();
        expect(EmptyUtil.isAPopulatedArrayOrObject('')).toBeFalsy();
    });
});
