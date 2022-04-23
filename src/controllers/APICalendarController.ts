import { CalendarData, CalendarMonthData, CalendarState, CampaignData, Date, InterCalData } from "../models/types";
import { AbstractCalendarController } from "./AbstractCalendarController";


export class APICalendarController extends AbstractCalendarController
{
    getCampaignData(): CampaignData {
        throw new Error("Method not implemented.");
    }
    getIntercalData(month: number, year : number): InterCalData[] {
        throw new Error("Method not implemented.");
    }
    getMonthData(month: number): CalendarMonthData {
        throw new Error("Method not implemented.");
    }
    changeDateBy(date: Date): CalendarState {
        throw new Error("Method not implemented.");
    }
    fetchData(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getCalendarData(): CalendarData {
        throw new Error("Method not implemented.");
    }
    setDate(date: Date): CalendarState {
        throw new Error("Method not implemented.");
    }
    getCalendarState(): CalendarState {
        throw new Error("Method not implemented.");
    }
    getCurrentMonthData(): CalendarMonthData {
        throw new Error("Method not implemented.");
    }

}