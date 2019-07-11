import {TimeSince} from '../models/time-since.model';

export class DateUtil {
    public static getDifference(from: Date | number, to: Date | number) {
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

    public static getDifferenceInMS(from: Date | number, to: Date | number): number {
        return +to - +from;
    }

    public static getDifferenceInSeconds(from: Date | number, to: Date | number): number {
        return Math.floor(DateUtil.getDifferenceInMS(from, to) / 1000);
    }

    public static timeSince(date: Date): number {
        return 0;
    }

    public static getDifferenceInMinutes(from: Date | number, to: Date | number) {
        return Math.floor(DateUtil.getDifferenceInSeconds(from, to) / 60);
    }

    public static getDifferenceInHours(from: Date | number, to: Date | number) {
        return Math.floor(DateUtil.getDifferenceInMinutes(from, to) / 60);
    }

    public static getDifferenceInDays(from: Date | number, to: Date | number) {
        return Math.floor(DateUtil.getDifferenceInHours(from, to) / 24);
    }
    public static getDifferenceInWeeks(from: Date | number, to: Date | number) {
        return Math.floor(DateUtil.getDifferenceInDays(from, to) / 7);
    }
}
