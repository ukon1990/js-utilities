import {DateUtil} from './date.util';
import {TimeSince} from '../models/time-since.model';

describe('DateUtil', () => {
    describe('getDifference', () => {
        it('can get time from a year ago or so', () => {
            expect(DateUtil.getDifference(
                new Date('May 4 2018 09:24:20'),
                new Date('July 4 2018 10:24:20')))
                .toEqual(
                    new TimeSince(
                        60,
                        6,
                        1,
                        0,
                        0,
                        0
                    )
                );
        });
    });

    it('getDifferenceInMS', () => {
        expect(DateUtil.getDifferenceInMS(
            new Date('May 4 2018 09:24:20'),
            new Date('May 4 2018 09:24:21')))
            .toBe(1000);
    });

    describe('timeSince', () => {
    });
});
