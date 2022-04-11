export interface Date {
    day? : number,
    month? : number,
    year? : number
}

export interface CalendarState {
    name : string,
    day : number,
    month: number,
    year : number,
    date? : string
  }
  

  export interface CalendarData {

    monthsInYear :  number
    daysInYear : number
    daysInMonth : number[]
    daysInWeek : number,
    leapYear : {
      month : number,
      recurrence : number
    },
    state : CalendarState
  }

  export interface CalendarMonthData {
    daysInMonth : number,
    daysInWeek : number
  }
  
  export interface CalendarMonthState {
    day? : number | null
  }
  