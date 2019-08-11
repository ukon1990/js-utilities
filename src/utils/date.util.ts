import {TimeSince} from '../models/time-since.model';

export class DateUtil {
    /* istanbul ignore next */
    private static getDifference(from: Date | number, to: Date | number): TimeSince {
        let msSince = DateUtil.getDifferenceInMS(from, to);

        const minuteInMS = 60000;
        const hourInMS = 3600000;
        const dayInMs = hourInMS * 24;

        const ms = msSince % 1000;

        msSince -= ms;
        const seconds = ( msSince / 1000) % minuteInMS;

        msSince -= ms;
        const minutes = (msSince / minuteInMS) % minuteInMS;

        msSince -= ms;
        const hours = (msSince / minuteInMS) % hourInMS;

        msSince -= ms;
        const days = (msSince / hourInMS) % dayInMs;

        msSince -= ms;
        const weeks = (msSince / dayInMs) % dayInMs * 7;
        return new TimeSince(
            weeks,
            days,
            hours,
            minutes,
            seconds,
            ms);
    }

    /**
     * Returns the difference between two dates in milliseconds
     */
    public static getDifferenceInMS(from: Date | number, to: Date | number): number {
        return +to - +from;
    }

    /**
     * Returns the difference between two dates in seconds
     */
    public static getDifferenceInSeconds(from: Date | number, to: Date | number): number {
        return Math.floor(DateUtil.getDifferenceInMS(from, to) / 1000);
    }

    /**
     * Returns the difference between two dates in minutes
     */
    public static getDifferenceInMinutes(from: Date | number, to: Date | number) {
        return Math.floor(DateUtil.getDifferenceInSeconds(from, to) / 60);
    }

    /**
     * Returns the difference between two dates in hours
     */
    public static getDifferenceInHours(from: Date | number, to: Date | number) {
        return Math.floor(DateUtil.getDifferenceInMinutes(from, to) / 60);
    }

    /**
     * Returns the difference between two dates in days
     */
    public static getDifferenceInDays(from: Date | number, to: Date | number) {
        return Math.floor(DateUtil.getDifferenceInHours(from, to) / 24);
    }

    /**
     * Returns the difference between two dates in weeks
     */
    public static getDifferenceInWeeks(from: Date | number, to: Date | number) {
        return Math.floor(DateUtil.getDifferenceInDays(from, to) / 7);
    }

    /**
     * Returns the time since a provided date.
     * @param date
     * @param timeUnit Can be empty(defaults to ms) or `s`/`seconds`, `m`/`minutes`, `h`/`hours`, `d`/`days`, `w`/`weeks`
     */
    public static timeSince(date: Date | number, timeUnit: string = 'ms'): number {
        const now = new Date();
        switch(timeUnit) {
            case 'w':
            case 'weeks':
                return DateUtil.getDifferenceInWeeks(date, now);
            case 'd':
            case 'days':
                return DateUtil.getDifferenceInDays(date, now);
            case 'h':
            case 'hours':
                return DateUtil.getDifferenceInHours(date, now);
            case 'm':
            case 'minutes':
                return DateUtil.getDifferenceInMinutes(date, now);
            case 's':
            case 'seconds':
                return DateUtil.getDifferenceInSeconds(date, now);
            default:
                return DateUtil.getDifferenceInMS(date, now);
        }
    }
}
