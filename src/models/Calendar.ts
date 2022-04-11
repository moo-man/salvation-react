import { CalendarMonthData } from "../components/calendar/CalendarMonth";
import { CalendarData, CalendarState } from "../routes/CalendarView";

interface Date {
    day? : number,
    month? : number,
    year? : number
}

export class Calendar {

    constructor(protected data : CalendarData) {}

    async setDate(date : Date) : Promise<CalendarState>
    {
        this.data.state.day = date.day || this.data.state.day
        this.data.state.month = date.month || this.data.state.month
        this.data.state.year = date.year || this.data.state.year

        this.data.state.date = `${this.data.state.day} ${this.data.state.month} ${this.data.state.year}`

        return this.data.state
    }

    async getDate() : Promise<CalendarState>
    {
        return this.data.state
    }

    getCurrentMonthData() : CalendarMonthData {
        return {
          daysInMonth : this.data.daysInMonth[this.data.state.month],
          daysInWeek : this.data.daysInWeek
        }
      }


}