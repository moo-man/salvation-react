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

    monthsInYear :  number,
    monthNames : string[],
    daysInYear : number,
    daysInMonth : number[]
    daysInWeek : number,
    leapYear : {
      month : number,
      recurrence : number
    },
    state : CalendarState
  }

  export interface CalendarMonthData {
    name : string,
    number : number,
    daysInMonth : number,
    daysInWeek : number
  }


  export interface CalendarOperations {
    changeDay(day: number) : void
    changeMonth(number: number) : void
  }
  