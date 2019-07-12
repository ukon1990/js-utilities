# Javascript utilities
This is a small package with some utilities.

To install: `npm i @ukon1990/js-utilities`

Build & Test status: [![CircleCI](https://circleci.com/gh/ukon1990/js-utilities/tree/master.svg?style=svg)](https://circleci.com/gh/ukon1990/js-utilities/tree/master)

## ObjectUtil
* `isObject(value)` - Checks if a value is an object and not array
* `isPopulatedObject(value)` - Returns true if an object is populated
* `overwrite(fromObject, toObject)` - Replaces all the values of one objects with another object
* `clone(object)` - Returns a cloned version of an object. Removing all child object references.
* `isEqual(object1, object2)` - Checks if two objects are equal regardless of object reference.
* `getDifference(object1, object2)` - Returns an array of object differences as `Difference` objects.

## ArrayUtil
* `isObject(value)` - Checks if a value is an object and not array
* `isPopulatedArray(value)` - Returns true if an array is populated
* `overwrite(fromArray, toArray)` - Replaces all the values of one array with another array
* `clone(array)` - Returns a cloned version of an array. Removing all child object references.
* `isEqual(array1, array2)` - Checks if two arrays are equal regardless of object reference.
* `getDifference(array1, array2)` - Returns an array of differences as `Difference` objects.

## TextUtil
* `isEmpty(string)` - Checks if a string is null, undefined or has a length of 0.
* `getMatchingParts(string, stringToFind)` - 
Returns a Match object. The Match object for `getMatchingParts('Chicken', 'ck')` 
looks like this `{start: 'Chi', match: 'ck', end: 'en'}`.
* `getIndexOf(sourceString, targetString)` - Is basically `sourceString.toLowerCase().indexOf(targetString.toLowerCase)`
* `contains(sourceString, targetString)` - Checks if a string exists within another. This is case-insensitive.
* `isLowerCase(string)` - Checks if a string is upper or lowercase.

## EmptyUtil
* `isNullOrUndefined(value, value?)` - Checks if all the input is null or undefined.
* `isAPopulatedArrayOrObject(value)` - Checks if a value is a populated array or object

## DateUtil
* `getDifference`
* `getDifferenceInMS`
* `timeSince`
