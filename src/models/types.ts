export interface Date {
  day?: number;
  month?: number;
  year?: number;
}

export interface CalendarState {
  day: number;
  month: number;
  year: number;
  date?: string;
  viewMode?: string;
}

export interface CalendarData {
  calendar: CalendarDefinition;
  state: CalendarState;
}

export interface CalendarDefinition {
  name: string;
  monthsInYear: number;
  monthNames: string[];
  daysInYear: number;
  daysInMonth: number[];
  daysInWeek: number;
  leapYear: {
    month: number;
    recurrence: number;
  };
  intercal: InterCalData[];
}

export interface InterCalData {
  month: number;
  leap?: boolean;
  name: string;
}

export interface CalendarMonthData {
  name: string;
  number: number;
  daysInMonth: number;
  daysInWeek: number;
  intercal?: InterCalData;
}


export interface CalendarOperations {
  changeDay(day: number): void;
  changeMonth(number: number): void;
}
