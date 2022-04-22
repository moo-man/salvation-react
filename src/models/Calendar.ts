import { CalendarData, CalendarDefinition, CalendarState, InterCalData } from "./types";

export class Calendar {
    
    constructor(private data : CalendarData){}


    get state() : CalendarState {
        return this.data.state;
    }

    daysInMonth(month: number, year : number) : number {
    
        let leapData = this.data.calendar.leapYear

        if (leapData.date.month !== month)
            return this.data.calendar.daysInMonth[month] 

        return this.data.calendar.daysInMonth[month] + (this.isLeap(month, year) ? 0 : -1)
    }

    intercalInMonth(month: number, year : number) : InterCalData[] {
        
        let isLeap = this.isLeap(month, year);

        return this.definition.intercal.filter(i => {
            if (i.date.month === month)
            {
                if (i.leap && isLeap)
                    return true
                else if (!i.leap)
                    return true
            }
            return false
        })
    }

    isLeap(month : number, year : number) : boolean
    {
        let leapData = this.data.calendar.leapYear
        return leapData.date.month === month && year % leapData.recurrence === 0
    }

    get daysInWeek() : number {
        return this.data.calendar.daysInWeek
    }
    get monthNames() : string[] {
        return this.data.calendar.monthNames
    }

    get definition() : CalendarDefinition{
        return {...this.data.calendar}
    }



}