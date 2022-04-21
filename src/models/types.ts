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
  notes : {[key: string] : Note[]}
}


export interface CalendarOperations {
  changeDay(day: number): void;
  changeMonth(number: number): void;
}


export enum Importance {None, Campaign, Global}
export enum NoteType {Normal, Start, Stop}


export interface CampaignData {
  notes : {
    [key: string] : Note[]
  }
  campaigns :   {
    [key: string] : Campaign
  }
  active? : Campaign
}

