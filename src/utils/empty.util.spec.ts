import { EmptyUtil } from "./empty.util";

describe('EmptyUtil', () => {
    describe('isNullOrUndefined', () => {
        it('Null returns true', () => {
            expect(EmptyUtil.isNullOrUndefined(null)).toBeTruthy();
        });

        it('Undefined returns true', () => {
            expect(EmptyUtil.isNullOrUndefined(undefined)).toBeTruthy();
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
});
