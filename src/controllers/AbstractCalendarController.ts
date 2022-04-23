import { CalendarData, CalendarMonthData, CalendarState, CampaignData, Date, InterCalData } from "../models/types";



export abstract class AbstractCalendarController {

    dataLoaded = false
    protected campaignData: CampaignData | null = null;

    abstract fetchData() : Promise<void>
    abstract setDate(date : Date) : CalendarState
    abstract getCalendarState() : CalendarState
    abstract getCalendarData() : CalendarData
    abstract getCurrentMonthData() : CalendarMonthData
    abstract getMonthData(month : number, year : number): CalendarMonthData
    abstract changeDateBy(date : Date) : CalendarState 
    abstract getIntercalData(month: number, year : number) : InterCalData[] | void
    abstract getCampaignData() : CampaignData
    setStateToCurrentDate() : CalendarState {
        let state = this.getCalendarState()
        if (this.campaignData?.active)
        {
            state =  this.setDate(this.campaignData?.active?.Date)
            state.viewMode = "month"
            return state
        }
        else 
            return state
    }

}