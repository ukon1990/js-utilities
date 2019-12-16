# Javascript utilities
This is a small package with some utilities.

To install: `npm i @ukon1990/js-utilities --save`

Build & Test status: [![CircleCI](https://circleci.com/gh/ukon1990/js-utilities/tree/master.svg?style=svg)](https://circleci.com/gh/ukon1990/js-utilities/tree/master)

## ObjectUtil
* `isObject(value)` - Checks if a value is an object and not array
* `isPopulatedObject(value)` - Returns true if an object is populated
* `overwrite(fromObject, toObject, doNotMutate = false)` - Replaces all the values of one objects with another object
* `clone(object)` - Returns a cloned version of an object. Removing all child object references.
* `isEqual(object1, object2)` - Checks if two objects are equal regardless of object reference.
* `getDifference(object1, object2)` - Returns an array of object differences as `Difference` objects.
* `merge(object1, object2` - Merges/Combines two objects into one, keeping all the
    values from each that does not exist in the other.

## ArrayUtil
* `isArray(value)` - Checks if a value is an object and not array
* `isPopulatedArray(value)` - Returns true if an array is populated
* `clone(array)` - Returns a cloned version of an array. Removing all child object references.
* `isEqual(array1, array2)` - Checks if two arrays are equal regardless of object reference.
* `getDifference(array1, array2)` - Returns an array of differences as `Difference` objects.
* `removeObject(value, fromArray, immutable = false)` - Removes all entries that is identical to a value from an array, regardless of the object reference. If , immutable = true, it will return a copy instead of mutating the input array.
* `removeObjects(values, fromArray)` - Removes multiple objects/values from an array.
* `removeIndexes(indexes, fromArray)` - Removes the elements from an array at the supplied index locations
* `removeDuplicates(fromArray, immutable = false)` - Remove all duplicate entries in an array. If , immutable = true, it will return a copy instead of mutating the input array.
* `randomOrder(fromArray)` - Returns a new array with the items in the fromArray in random order.

## TextUtil
* `isEmpty(string)` - Checks if a string is null, undefined or has a length of 0.
* `isEqualIgnoreCase(string, string` - Checks if two strings are equal (case insensitive).
* `getMatchingParts(string, stringToFind)` - 
    Returns a Match object. The Match object for `getMatchingParts('Chicken', 'ck')` 
    looks like this `{start: 'Chi', match: 'ck', end: 'en'}`.
* `getIndexOf(sourceString, targetString)` - Is basically `sourceString.toLowerCase().indexOf(targetString.toLowerCase)`
* `contains(sourceString, targetString)` - Checks if a string exists within another. This is case-insensitive.
* `isLowerCase(string)` - Checks if a string is upper or lowercase.
* `sentenceToCamelCase(sentence, upperCase?)` - Converts a sentence into lower camel case.
* `camelCaseToSentence(sentence)` - Converts a sentence of camelCase words into a sentence with spaces.
* `csvToObjects(input, delimiter?, options?: {headerNames?: string[], types?: string[]})` - 
    Generates an array of objects from a CSV string.
* `objectsToCSV(list, delimiter?: string = ',', useKeys?: string[])` - Converts a list of objects to a CSV string. If provided with the 
keys that is supposed to be used from the objects, it will increase performance.

## EmptyUtil
* `isNullOrUndefined(value, value?)` - Checks if all the input is null or undefined.
* `isAPopulatedArrayOrObject(value)` - Checks if a value is a populated array or object

## DateUtil
* `getDifferenceInMS(fromDate, toDate)` - Returns the difference between two dates in milliseconds
* `getDifferenceInSeconds(fromDate, toDate)` - Returns the difference between two dates in seconds
* `getDifferenceInMinutes(fromDate, toDate)` - Returns the difference between two dates in minutes
* `getDifferenceInHours(fromDate, toDate)` - Returns the difference between two dates in hours
* `getDifferenceInDays(fromDate, toDate)` - Returns the difference between two dates in days
* `getDifferenceInWeeks(fromDate, toDate)` - Returns the difference between two dates in weeks
* `timeSince(fromDate)` - Returns the time since a provided date. The second parameter can be empty(defaults to ms) or `s`/`seconds`, `m`/`minutes`, `h`/`hours`, `d`/`days`, `w`/`weeks`.
