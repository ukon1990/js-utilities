import {ObjectUtil} from './object.util';

describe('ObjectUtil', () => {

    describe('isObject', () => {
        it('Populated objects returns true', () => {
            expect(ObjectUtil.isObject({name: 'true'})).toBeTruthy();
        });

        it('Empty objects are objects too', () => {
            expect(ObjectUtil.isObject({})).toBeTruthy();
        });

        it('Arrays are not objects', () => {
            expect(ObjectUtil.isObject([])).toBeFalsy();
            expect(ObjectUtil.isObject(['Tore', 'Tang', 'en', 'gammal', 'mann'])).toBeFalsy();
        });
    });

    describe('isPopulatedObject', () => {
        it('Populated objects returns true', () => {
            expect(ObjectUtil.isPopulatedObject({name: 'true'})).toBeTruthy();
        });

        it('Empty objects are false', () => {
            expect(ObjectUtil.isPopulatedObject({})).toBeFalsy();
        });
    });

    describe('overwrite', () => {
        it('Can overwrite one object with another', () => {
            const obj = {name: 'Teigen', child: [{name: 'Urge'}]};
            const obj2 = {name: 'Trond', child: [{name: 'Purge'}]};

            ObjectUtil.overwrite(obj2, obj);

            expect(obj.name).toEqual(obj2.name);
            expect(obj.child[0].name).toEqual(obj2.child[0].name);
            expect(obj === obj2).toBeFalsy();
            expect(obj.child === obj2.child).toBeFalsy();
        });

        it('Can overwrite one object with another', () => {
            const obj = {name: 'Teigen'};
            const obj2 = {name: undefined};
            ObjectUtil.overwrite(obj2, obj);
            expect(obj).toEqual(obj2);
        });

        it('If the from value is null or undefined it will do nothing', () => {
            const obj = {name: 'Teigen'};
            ObjectUtil.overwrite(null, obj);
            expect(obj).toEqual(obj);

            ObjectUtil.overwrite(undefined, obj);
            expect(obj).toEqual(obj);
        });
    });

    describe('clone', () => {
        it('Returns the object as is if null or undefined', () => {
        });

        it('Returns a clone of an object with a difference object refrence', () => {
            const obj = {
                name: 'Tor',
                weapon: 'Mjǫlnir'
            };
            const clone = ObjectUtil.clone(obj);
            expect(clone).toEqual(obj);
            expect(clone === obj).toBeFalsy();
        });
    });

    describe('getDifference && isEqual', () => {
        it('Can check if objects have identical content without JSON.stringify', () => {
            const obj1 = {name: 'Hi', list: ['A', 'B', 'C'], easyAs: {oneTwoThree: 'Do re mi'}};
            const obj2 = {name: 'Hi', list: ['A', 'B', 'C'], easyAs: {oneTwoThree: 'Do re mi'}};
            expect(ObjectUtil.getDifference(obj1, obj2).length).toBeFalsy();
            expect(ObjectUtil.isEqual(obj1, obj2)).toBeTruthy();
        });

        it('Non identical objects are not equal', () => {
            const obj1 = {name: 'Hi', list: ['A', 'B', 'C'], easyAs: {oneTwoThree: 'Do re mi'}};
            const obj2 = {name: 'Hi', list: ['A', 'B', 'D'], easyAs: {oneTwoThree: 'Do re mi'}};
            expect(ObjectUtil.getDifference(obj1, obj2).length).toBeTruthy();
            expect(ObjectUtil.isEqual(obj1, obj2)).toBeFalsy();
        });
    });
});
