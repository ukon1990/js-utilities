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


        it('Identical texts report positive', () => {
            expect(TextUtil.contains('The origin', 'The origin')).toBeTruthy();
        });
    });
});
