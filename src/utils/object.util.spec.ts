import { ObjectUtil } from "./object.util";

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
            expect(ObjectUtil.isObject(['Tore','Tang', 'en', 'gammal', 'mann'])).toBeFalsy();
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
            const obj = {};
            const obj2 = {};
            expect();
        });
    });

    describe('overwriteField', () => {});

    describe('clone', () => {});

    describe('isEqual', () => {});

    describe('getDifference', () => {});
});
