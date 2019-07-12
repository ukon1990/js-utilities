import {DateUtil} from './date.util';
import {TimeSince} from '../models/time-since.model';

describe('DateUtil', () => {/*
    describe('getDifference', () => {
        it('can get time from a year ago or so', () => {
            expect(DateUtil.getDifference(
                new Date('May 4 2018 09:24:20'),
                new Date('July 4 2018 10:34:35')))
                .toEqual(
                    new TimeSince(
                        60,
                        6,
                        1,
                        10,
                        15,
                        0
                    )
                );
        });
    });*/

    it('getDifferenceInMS', () => {
        expect(DateUtil.getDifferenceInMS(
            new Date('May 4 2018 09:24:20'),
            new Date('May 4 2018 09:24:21')))
            .toBe(1000);
    });

    it('getDifferenceInSeconds', () => {
        expect(DateUtil.getDifferenceInSeconds(
            new Date('May 4 2018 09:24:20'),
            new Date('May 4 2018 09:26:21')))
            .toBe(121);
    });

    it('getDifferenceInMinutes', () => {
        expect(DateUtil.getDifferenceInMinutes(
            new Date('May 4 2018 09:24:20'),
            new Date('May 4 2018 09:26:21')))
            .toBe(2);
    });

    it('getDifferenceInHours', () => {
        expect(DateUtil.getDifferenceInHours(
            new Date('May 4 2018 09:24:20'),
            new Date('May 4 2018 19:26:21')))
            .toBe(10);
    });

    it('getDifferenceInDays', () => {
        expect(DateUtil.getDifferenceInDays(
            new Date('May 4 2018 09:24:20'),
            new Date('May 24 2018 19:26:21')))
            .toBe(20);
    });

    it('getDifferenceInWeeks', () => {
        expect(DateUtil.getDifferenceInWeeks(
            new Date('May 4 2018 09:24:20'),
            new Date('May 24 2018 19:26:21')))
            .toBe(2);
    });

    describe('timeSince', () => {
    });
});
