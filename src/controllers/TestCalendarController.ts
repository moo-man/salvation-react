import { Calendar } from "../models/Calendar"
import { CalendarData, CalendarMonthData, CalendarState, Date} from "../models/types";
import { AbstractCalendarController } from "./AbstractCalendarController";


export class TestCalendarController extends AbstractCalendarController{

    protected model : Calendar | null = null

    constructor() {
        super();
        let testData : CalendarData = {

            monthsInYear :  12,
            daysInYear : 365,
            daysInMonth : [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            daysInWeek : 7,
            leapYear : {
              month : 2,
              recurrence : 4
            },
            state : {  
              name : "Earth",
              day : 12,
              month: 3,
              year : 1422,
              date : `February 12, 1422`
            }
          }
          
        this.model = new Calendar(testData);
    }

    async setDate(date : Date) : Promise<CalendarState>
    {
        if (this.model)
        {
            this.model.state.day = date.day || this.model.state.day
            this.model.state.month = date.month || this.model.state.month
            this.model.state.year = date.year || this.model.state.year

            this.model.state.date = `${this.model.state.day} ${this.model.state.month} ${this.model.state.year}`

            return this.model.state
        }   
        else throw Error("No Calendar Model")
    }

    async getDate() : Promise<CalendarState>
    {
        if(this.model)
            return this.model.state 
        else 
            throw Error("No Calendar Model")
    }

    async getData() : Promise<CalendarData>
    {
        if(this.model)
        {
            return this.model.data
        }
        else throw Error("No Calendar Model")
    }

    getCurrentMonthData() : CalendarMonthData {
        if (this.model)
        {
            return {
              daysInMonth : this.model.data.daysInMonth[this.model.state.month],
              daysInWeek : this.model.data.daysInWeek
            }
        }
        else throw Error("No Calendar Model")
      }
    }