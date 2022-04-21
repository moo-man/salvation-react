import { CalendarData, CalendarMonthData, CalendarState, Date, InterCalData } from "../models/types";



export abstract class AbstractCalendarController {

    dataLoaded = false

    abstract fetchData() : Promise<void>
    abstract setDate(date : Date) : CalendarState
    abstract getCalendarState() : CalendarState
    abstract getCalendarData() : CalendarData
    abstract getCurrentMonthData() : CalendarMonthData
    abstract getMonthData(month : number, year : number): CalendarMonthData
    abstract changeDateBy(date : Date) : CalendarState 
    abstract getIntercalData(month: number, year : number) : InterCalData | void

}