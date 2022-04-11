import { CalendarData, CalendarMonthData, CalendarState, Date } from "../models/types";
import { AbstractCalendarController } from "./AbstractCalendarController";


export class APICalendarController extends AbstractCalendarController
{
    getData(): Promise<CalendarData> {
        throw new Error("Method not implemented.");
    }
    setDate(date: Date): Promise<CalendarState> {
        throw new Error("Method not implemented.");
    }
    getDate(): Promise<CalendarState> {
        throw new Error("Method not implemented.");
    }
    getCurrentMonthData(): CalendarMonthData {
        throw new Error("Method not implemented.");
    }

}