import { TextUtil } from './text.util';
import { Match } from '../models/match.model';

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

  describe('isEqualIgnoreCase', () => {
    it('returns true if both are empty', () => {
      expect(TextUtil.isEqualIgnoreCase(null, undefined)).toBeTruthy();
    });

    it('returns false if either are empty and the other has a value', () => {
      expect(TextUtil.isEqualIgnoreCase(null, 'hi')).toBeFalsy();
      expect(TextUtil.isEqualIgnoreCase('his', undefined)).toBeFalsy();
    });

    it('returns false if texts are a missmatch', () => {
      expect(TextUtil.isEqualIgnoreCase('ey', 'you')).toBeFalsy();
    });

    it('returns true when texts match', () => {
      expect(TextUtil.isEqualIgnoreCase('ey', 'ey')).toBeTruthy();
      expect(TextUtil.isEqualIgnoreCase('eY', 'ey')).toBeTruthy();
      expect(TextUtil.isEqualIgnoreCase('EY!', 'ey!')).toBeTruthy();
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

  describe('getMatchingParts', () => {
    it('is case insensitive', () => {
      expect(TextUtil.getMatchingParts('OREGAMI', 'ga')).toEqual(
        new Match('ORE', 'GA', 'MI')
      );
    });

    it('Returns emtpy match if the string is undefined or null', () => {
      expect(TextUtil.getMatchingParts(undefined, 'ga')).toEqual(
        new Match('', '', '')
      );
      expect(TextUtil.getMatchingParts(null, 'ga')).toEqual(
        new Match('', '', '')
      );
    });

    it('If the query string is undefined, empty or null it returns the whole thing at the "end" variable', () => {
      expect(TextUtil.getMatchingParts('OREGAMI', undefined)).toEqual(
        new Match('', '', 'OREGAMI')
      );
      expect(TextUtil.getMatchingParts('OREGAMI', null)).toEqual(
        new Match('', '', 'OREGAMI')
      );
      expect(TextUtil.getMatchingParts('OREGAMI', '')).toEqual(
        new Match('', '', 'OREGAMI')
      );
    });
  });

  describe('setMatchingParts', () => {});

  it('sentenceToCamelCase', () => {
    expect(TextUtil.sentenceToCamelCase('This is a test')).toEqual(
      'thisIsATest'
    );
    expect(TextUtil.sentenceToCamelCase('This is a test', true)).toEqual(
      'ThisIsATest'
    );
    expect(TextUtil.sentenceToCamelCase('This is a test!. Yes')).toEqual(
      'thisIsATestYes'
    );
  });

  it('camelCaseToSentence', () => {
    expect(TextUtil.camelCaseToSentence('thisIsATest')).toEqual(
      'This is a test'
    );
  });

  describe('isLowerCase', () => {
    it('Text with uppercase in it is not lowercase', () => {
      expect(TextUtil.isLowerCase('Hello')).toBeFalsy();
    });

    it('Text in lowercase is lowercase', () => {
      expect(TextUtil.isLowerCase('hello')).toBeTruthy();
    });
  });

  describe('isUpperCase', () => {
    it('Text with lowercase in it is not uppercase', () => {
      expect(TextUtil.isUpperCase('Hello')).toBeFalsy();
      expect(TextUtil.isUpperCase('hello')).toBeFalsy();
    });

    it('Text in uppercase is uppercase', () => {
      expect(TextUtil.isUpperCase('HELLO')).toBeTruthy();
    });
  });

  describe('objectsToCSV', () => {
    it('can convert a list of objects with identical keys', () => {
      const list = [{ name: 'John', age: 90 }, { name: 'Aga', age: 12 }];
      expect(TextUtil.objectsToCSV(list, ';')).toEqual(
        'Name;Age\n\r' + 'John;90\n\r' + 'Aga;12\n\r'
      );
      expect(TextUtil.objectsToCSV(list, ';', ['name'])).toEqual(
        'Name\n\r' + 'John\n\r' + 'Aga\n\r'
      );
    });
  });

  describe('csvToObjects', () => {
    it('can generate object from csv', () => {
      const csv =
        'Name;Age;Location;Is Human\n' +
        'Orochimaru;900;Somewhere;true\n\r' +
        'King Kong;34;India;false\n\r' +
        'Ubuhuru Kakadu;122;No idea;true\n\r';
      const list = TextUtil.csvToObjects<any>(csv, ';');

      expect(list.length).toBe(3);
      expect(list[1].age).toBe(34);
      expect(list[1].isHuman).toBe(false);
    });
  });
});
