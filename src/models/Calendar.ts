import { CalendarData, CalendarState } from "./types";

export class Calendar {
    
    constructor(public data : CalendarData){}


    get state() : CalendarState {
        return this.data.state;
    }


}