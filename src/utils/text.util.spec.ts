import { TextUtil } from "./text.util";

describe('TextUtil', () => {
    describe('isEmpty', () => {
        it('Should be true if null', () => {
            expect(TextUtil.isEmpty(null)).toBeTruthy();
        });


        it('Should be true if undefined', () => {
            expect(TextUtil.isEmpty(undefined)).toBeTruthy();
        });


        it('Should be true if length is 0', () => {
            expect(TextUtil.isEmpty('')).toBeTruthy();
        });

        it('Should be false if length > 0', () => {
            expect(TextUtil.isEmpty('A')).toBeFalsy();
            expect(TextUtil.isEmpty('A longer text')).toBeFalsy();
        });

        it('Should be false for numbers', () => {
            expect(TextUtil.isEmpty(0)).toBeFalsy();
            expect(TextUtil.isEmpty(1)).toBeFalsy();
        });
    });

    describe('contains', () => {
        it('Will fail if no text overlaps', () => {
            expect(TextUtil.contains('The origin', 'is not found')).toBeFalsy();
        });


        it('Identical texts report positive for identical texts', () => {
            expect(TextUtil.contains('The origin', 'The origin')).toBeTruthy();
        });

        it('Does not care about upper or lower case', () => {
            expect(TextUtil.contains('THIS IS A TEST', 'is')).toBeTruthy();
        });

        it('numbers are ok', () => {
            expect(TextUtil.contains('300', '30')).toBeTruthy();
        });
    });

    describe('getIndexOf', () => {
        it('Can get the index of a string, regardless of case', () => {
            expect(TextUtil.getIndexOf('Hei', 'i')).toBe(2);
            expect(TextUtil.getIndexOf('Hei', 'I')).toBe(2);
        });

        it('Returns false if not found', () => {
            expect(TextUtil.getIndexOf('Stuff', 'Nope')).toBe(-1);
        });

        it('Returns false if not found', () => {
            expect(TextUtil.getIndexOf('Stuff', undefined)).toBe(-1);
            expect(TextUtil.getIndexOf(null, undefined)).toBe(-1);
            expect(TextUtil.getIndexOf(undefined, undefined)).toBe(-1);
            expect(TextUtil.getIndexOf(undefined, '')).toBe(-1);
        });
    });
});
