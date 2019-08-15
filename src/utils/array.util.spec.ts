import {ArrayUtil} from './array.util';

describe('ArrayUtil', () => {
    describe('isArray', () => {
        it('can detect arrays', () => {
            expect(ArrayUtil.isArray([])).toBeTruthy();
            expect(ArrayUtil.isArray(['Bubblegum'])).toBeTruthy();
        });

        it('objects are not arrays(kinda)', () => {
            expect(ArrayUtil.isArray({length: 10})).toBeFalsy();
            expect(ArrayUtil.isArray({})).toBeFalsy();
        });
    });

    describe('isPopulatedArray', () => {
        it('Empty array is false', () => {
            expect(ArrayUtil.isPopulatedArray([])).toBeFalsy();
        });

        it('Non-empty array is true', () => {
            expect(ArrayUtil.isPopulatedArray(['a'])).toBeTruthy();
        });
    });

    describe('clone', () => {
        it('Can not clone null', () => {
            expect(ArrayUtil.clone(null)).toBeNull();
        });

        it('Can clone an array of numbers', () => {
            const array = [1, 2, 3, 4, 5];
            expect(ArrayUtil.clone(array)).toEqual(array);
        });

        it('Can clone an array of strings', () => {
            const array = ['1', '2', '3', '4', '5'];
            expect(ArrayUtil.clone(array)).toEqual(array);
        });

        it('Can clone an array of booleans', () => {
            const array = [false, false, false, false, false];
            expect(ArrayUtil.clone(array)).toEqual(array);
        });

        it('Can clone an array of objects and arrays', () => {
            const array = [{isTrue: true}, {isFalse: false}, ['Non']];
            expect(ArrayUtil.clone(array)).toEqual(array);
        });
    });

    describe('getDifference && isEqual', () => {
        it('Identical arrays', () => {
            expect(ArrayUtil.getDifference(['1', 2], ['1', 2]).length).toBeFalsy();
            expect(ArrayUtil.isEqual(['1', 2], ['1', 2])).toBeTruthy();
        });

        it('Non-identical arrays ar not equal', () => {
            expect(ArrayUtil.getDifference(['1', 2, 3], ['1', 2]).length).toBeTruthy();
            expect(ArrayUtil.isEqual(['1', 2, 3], ['1', 2])).toBeFalsy();
        });
    });

    describe('removeObject', () => {
        it('Can remove multiples of identical objects from array', () => {
            const object = {name: 'John', level: -1};
            const object2 = {name: 'August', level: 30};
            const array = [
                {name: 'John', level: -1},
                {name: 'August', level: 30},
                {name: 'John', level: -1},
                {name: 'Peter', level: '!cow'}
            ];
            ArrayUtil.removeObject(object, array);
            expect(array.length).toBe(2);
            expect(array[0]).toEqual(object2);
        });
        
        it('Can remove multiples of identical strings from array', () => {
            const object = {name: 'John', level: -1};
            const array = [
                'a', 'b', 'a', 'a', 'b'
            ];
            ArrayUtil.removeObject('a', array);
            expect(array.length).toBe(2);
        });


        it('Can remove multiples of identical numbers from array', () => {
            const object = {name: 'John', level: -1};
            const array = [
                0, 1, 0, 0, 1
            ];
            ArrayUtil.removeObject(1, array);
            expect(array.length).toBe(3);
        });


        it('Can remove multiples of identical booleans from array', () => {
            const object = {name: 'John', level: -1};
            const array = [
                true, false, true, true, false
            ];
            ArrayUtil.removeObject(false, array);
            expect(array.length).toBe(3);
        });
    });

    describe('removeObjects', () => {
        it('Can remove multiples of identical objects from array', () => {
            const object = {name: 'John', level: -1};
            const object2 = {name: 'Peter', level: '!cow'};
            const object3 = {name: 'August', level: 30};
            const array = [
                {name: 'John', level: -1},
                {name: 'August', level: 30},
                {name: 'John', level: -1},
                {name: 'Peter', level: '!cow'}
            ];
            ArrayUtil.removeObjects([object, object2], array);
            expect(array.length).toBe(1);
            expect(array[0]).toEqual(object3);
        });
    });

    describe('removeDuplicates', () => {
        it('can remove duplicates', () => {
            const array = [
                {name: 'John', level: -1},
                {name: 'August', level: 30},
                {name: 'John', level: -1},
                {name: 'Peter', level: '!cow'},
                null,
                undefined,
                undefined,
                true,
                false,
                1,
                1,
                [],
                []
            ];

            ArrayUtil.removeDuplicates(array);
            expect(array.length).toBe(9);
        });
    });

    describe('removeIndexes', () => {
       it('can remove multiple in random index order', () => {
            const array = [
                'a', // 0 - 0
                'b', // 1 - x
                'c', // 2 - x
                'd', // 3 - 1
                'e', // 4 - x
                'f' // 5 - 2
            ];
            ArrayUtil.removeIndexes([1,4, 2], array);
            expect(array.length).toBe(3);
            expect(array[0]).toBe('a');
            expect(array[1]).toBe('d');
            expect(array[2]).toBe('f');
       });
    });

    it('randomOrder', () => {
        const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const list1 = ArrayUtil.randomOrder(list);
        const list2 = ArrayUtil.randomOrder(list);

        expect(list1.length).toBe(list.length);
        expect(list2.length).toBe(list.length);
        expect(
            ArrayUtil.isEqual(list1, list2)).toBeFalsy();
    });
});
