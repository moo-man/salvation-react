import { CalendarData, CalendarMonthData, CalendarState, Date } from "../models/types";
import { AbstractCalendarController } from "./AbstractCalendarController";


export class APICalendarController extends AbstractCalendarController
{
    getMonthData(month: number): CalendarMonthData {
        throw new Error("Method not implemented.");
    }
    changeDateBy(date: Date): CalendarState {
        throw new Error("Method not implemented.");
    }
    fetchData(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getCalendarData(): CalendarData {
        throw new Error("Method not implemented.");
    }
    setDate(date: Date): CalendarState {
        throw new Error("Method not implemented.");
    }
    getCalendarState(): CalendarState {
        throw new Error("Method not implemented.");
    }
    getCurrentMonthData(): CalendarMonthData {
        throw new Error("Method not implemented.");
    }

}