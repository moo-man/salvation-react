import { CalendarData, CalendarMonthData, CalendarState, Date } from "../models/types";



export abstract class AbstractCalendarController {
    abstract setDate(date : Date) : Promise<CalendarState>
    abstract getDate() : Promise<CalendarState>
    abstract getData() : Promise<CalendarData>
    abstract getCurrentMonthData() : CalendarMonthData
}