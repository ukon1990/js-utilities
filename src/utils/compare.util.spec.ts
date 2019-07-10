import {CompareUtil} from "./compare.util";

describe('CompareUtil', () => {
    describe('setDifferences', () => {
    });

    describe('handleNullOrUndefined', () => {
    });

    describe('hasChildren', () => {
    });

    describe('isNullOrUndefined', () => {
    });

    describe('isNull', () => {
    });

    describe('isUndefined', () => {
    });

    describe('isNullAndUndefined', () => {
    });

    describe('isEmptyString', () => {
        it('Won\'t fail if null', () => {
            expect(CompareUtil['isEmptyString'](null)).toBeFalsy();
            expect(CompareUtil['isEmptyString'](null, null)).toBeFalsy();
        });

        it('Won\'t fail if undefined', () => {
            expect(CompareUtil['isEmptyString'](undefined)).toBeFalsy();
            expect(CompareUtil['isEmptyString'](undefined, undefined)).toBeFalsy();
        });

        it('If the first string value is true it should return true', () => {
            expect(CompareUtil['isEmptyString']('')).toBeTruthy();
            expect(CompareUtil['isEmptyString']('', '')).toBeTruthy();
        });
    });
});
