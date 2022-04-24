import { Note } from "./Note";
import { Campaign } from "./Campaign"

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
  yearName : string
  notes : {"month" : {[key: number] : Note[]}, "day" : {[key: number] : Note[]}, title : {month: string, day : string}}
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
    date: Date;
    recurrence: number;
  };
  intercal: InterCalData[];
}

export interface InterCalData {
  date : Date
  leap?: boolean;
  name: string;
}

export interface CalendarMonthData {
  name: string;
  number: number;
  year: number;
  daysInMonth: number;
  daysInWeek: number;
  intercal: InterCalData[];
  notes : Note[]
}


export interface CalendarOperations {
  changeDay(day: number): void;
  changeMonth(month: number): void;
  changeYear(year: number): void
  setDay(day: number): void;
  setMonth(month: number): void;
  setYear(year: number): void
  switchViewTo(view : string) : void
}


export enum Importance {None, Campaign, Global}
export enum NoteType {Normal, Start, Stop}


export interface CampaignData {
  // notes : {
  //   // year             // month       //day
  //   [key: number] : {[key : number] : {[key : number] : Note[]}} 
  // }
  notes :  Note[]
  campaigns :   {
    [key: string] : Campaign
  }
  active? : Campaign
  date? : string
}


