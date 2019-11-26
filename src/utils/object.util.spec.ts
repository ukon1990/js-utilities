import {ObjectUtil} from './object.util';

describe('ObjectUtil', () => {

    describe('isObject', () => {
        it('Populated objects returns true', () => {
            expect(ObjectUtil.isObject({name: 'true'})).toBe(true);
        });

        it('Empty objects are objects too', () => {
            expect(ObjectUtil.isObject({})).toBe(true);
        });

        it('Arrays are not objects', () => {
            expect(ObjectUtil.isObject([])).toBe(false);
            expect(ObjectUtil.isObject(['Tore', 'Tang', 'en', 'gammal', 'mann'])).toBe(false);
        });
    });

    describe('isPopulatedObject', () => {
        it('Populated objects returns true', () => {
            expect(ObjectUtil.isPopulatedObject({name: 'true'})).toBe(true);
        });

        it('Empty objects are false', () => {
            expect(ObjectUtil.isPopulatedObject({})).toBe(false);
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

        it('Can overwrite nested objects', () => {
            const obj = {name: 'test', child: {age: 99, child: {engine: 'unity'}}};
            const obj2 = {name: 'test2', child: {age: 100, child: {engine: 'unreal'}}};

            ObjectUtil.overwrite(obj, obj2);

            expect(obj2.name).toBe(obj.name);
            expect(obj2.child.age).toBe(obj.child.age);
            expect(obj2.child.child.engine).toBe(obj.child.child.engine);
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
            expect(ObjectUtil.isEqual(obj1, obj2)).toBe(true);
        });

        it('Non identical objects are not equal', () => {
            const obj1 = {name: 'Hi', list: ['A', 'B', 'C'], easyAs: {oneTwoThree: 'Do re mi'}};
            const obj2 = {name: 'Hi', list: ['A', 'B', 'D'], easyAs: {oneTwoThree: 'Do re mi'}};
            expect(ObjectUtil.getDifference(obj1, obj2).length).toBeTruthy();
            expect(ObjectUtil.isEqual(obj1, obj2)).toBeFalsy();
        });

        it('Circularity', () => {
            const obj1 = {name: 'Hi', list: ['A', 'B', 'C'], easyAs: {oneTwoThree: 'Do re mi'}, circular: undefined};
            obj1.circular = obj1;
            const obj2 = {name: 'Hi', list: ['A', 'B', 'D'], easyAs: {oneTwoThree: 'Do re mi'}, circular: undefined};
            obj2.circular = obj2;
            expect(ObjectUtil.getDifference(obj1, obj2).length).toBeTruthy();
            expect(ObjectUtil.isEqual(obj1, obj2)).toBeFalsy();
            expect(ObjectUtil.getDifference(obj2, obj2).length).toBeFalsy();
        });
    });
});
