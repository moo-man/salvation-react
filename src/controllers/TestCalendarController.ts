import { stat } from 'fs';
import { Calendar } from '../models/Calendar';
import {
  CalendarData,
  CalendarMonthData,
  CalendarState,
  Date,
} from '../models/types';
import { AbstractCalendarController } from './AbstractCalendarController';

export class TestCalendarController extends AbstractCalendarController {
  protected model: Calendar | null = null;

  constructor() {
    super();
    let testData: CalendarData = {
      monthNames: [
        '',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthsInYear: 12,
      daysInYear: 365,
      daysInMonth: [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      daysInWeek: 7,
      leapYear: {
        month: 2,
        recurrence: 4,
      },
      state: {
        name: 'Earth',
        day: 12,
        month: 3,
        year: 1422,
        date: `March 12, 1422`,
      },
    };

    this.model = new Calendar(testData);
  }

  async fetchData(): Promise<void> {
    this.dataLoaded = true;
    return;
  }

  setDate(date: Date): CalendarState {
    if (this.model) {
      this.model.state.day = date.day || this.model.state.day;
      this.model.state.month = date.month || this.model.state.month;
      this.model.state.year = date.year || this.model.state.year;

      this.model.state.date = `${this.model.state.day} ${this.model.state.month} ${this.model.state.year}`;

      return this.model.state;
    } else throw Error('No Calendar Model');
  }

  changeDateBy(date: Date): CalendarState {
    if (this.model) {
      this.model.state.day += date.day || 0;
      this.model.state.month += date.month || 0;
      this.model.state.year += date.year || 0;

      this.model.state.date = `${this.model.state.day} ${this.model.state.month} ${this.model.state.year}`;

      this.checkStateChange();

      return this.model.state;
    } else throw Error('No Calendar Model');
  }

  getCalendarState(): CalendarState {
    if (this.model) return this.model.state;
    else throw Error('No Calendar Model');
  }

  getCalendarData(): CalendarData {
    if (this.model) {
      return this.model.data;
    } else throw Error('No Calendar Model');
  }

  getCurrentMonthData(): CalendarMonthData {
    if (this.model) {
      return {
        daysInMonth: this.model.data.daysInMonth[this.model.state.month],
        daysInWeek: this.model.data.daysInWeek,
        name: this.model.data.monthNames[this.model.state.month],
        number: this.model.state.month,
      };
    } else throw Error('No Calendar Model');
  }

  getMonthData(month : number): CalendarMonthData {
    if (this.model) {
      return {
        daysInMonth: this.model.data.daysInMonth[month],
        daysInWeek: this.model.data.daysInWeek,
        name: this.model.data.monthNames[month],
        number: month,
      };
    } else throw Error('No Calendar Model');
  }


  checkStateChange(): void {
    if (this.model) {

      let state = this.model.state;
      let data = this.model.data

      if (state.day > data.daysInMonth[state.month])
      {
        state.month++;
        state.day = 1;
      }

      if (state.day <= 0)
      {
        state.month--;
        state.day = data.daysInMonth[state.month]
      }


      if (state.month > data.monthsInYear)
      {
        state.month = 1;
        state.year++;
      }
      else if (state.month <= 0)
      {
        state.month = data.monthsInYear;
        state.year--;
      }



    }
    
  }
}
