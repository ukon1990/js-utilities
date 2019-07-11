import {TimeSince} from '../models/time-since.model';

export class DateUtil {
    public static getDifference(from: Date, to: Date) {
        return new TimeSince(0, 0, 0, 0, 0, 0);
    }
    public static getDifferenceInMS(from: Date, to: Date): number {
        return +from - +to;
    }

    public static getDifferenceInSeconds(from: Date, to: Date): number {
        return Math.round(DateUtil.getDifferenceInMS(from, to) / 1000);
    }

    public static timeSince(date: Date): number {
        return 0;
    }
}
