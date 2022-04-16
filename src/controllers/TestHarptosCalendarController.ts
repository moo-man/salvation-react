import { Calendar } from '../models/Calendar';
import {
  CalendarData,
  CalendarMonthData,
  CalendarState,
  Date,
  InterCalData
} from '../models/types';
import { AbstractCalendarController } from './AbstractCalendarController';

export class TestHarptosCalendar extends AbstractCalendarController {
  protected model: Calendar | null = null;

  constructor() {
    super();
    let testData: CalendarData = {
      calendar: {
        name: 'Calendar of Harptos',
        intercal: [
          { name: 'Midwinter', month: 1 },
          { name: 'Greengrass', month: 4 },
          { name: 'Shieldmeet', month: 7, leap: true },
          { name : "Highharvestide", month: 9 },
          { name: 'Feast of the Moon', month: 11 },
        ],
        monthNames: [
          '',
          'Hammer',
          'Alturiak',
          'Ches',
          'Tarsakh',
          'Mirtul',
          'Kythorn',
          'Flamerule',
          'Eleasis',
          'Eleint',
          'Marpenoth',
          'Uktar',
          'Nightal',
        ],
        monthsInYear: 12,
        daysInYear: 365,
        daysInMonth: [0, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        daysInWeek: 10,
        leapYear: {
          month: 7,
          recurrence: 4,
        },
      },
      state: {
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
      return this.getMonthData(this.model.state.month)
    } else throw Error('No Calendar Model');
  }

  getMonthData(month: number): CalendarMonthData {
    if (this.model) {
      return {
        daysInMonth: this.model.data.calendar.daysInMonth[month],
        daysInWeek: this.model.data.calendar.daysInWeek,
        name: this.model.data.calendar.monthNames[month],
        number: month,
        intercal: this.getIntercalData(month) || undefined,
      };
    } else throw Error('No Calendar Model');
  }

  getIntercalData(month: number) : InterCalData | void
  {
    if (this.model)
    {
      let intercal = this.model.data.calendar.intercal.find((i) => month == i.month)
      if (intercal) return intercal
    }
  }

  checkStateChange(): void {
    if (this.model) {
      let state = this.model.state;
      let data = this.model.data;

      if (state.day > data.calendar.daysInMonth[state.month]) {
        state.month++;
        state.day = 1;
      }

      if (state.day <= 0) {
        state.month--;
        state.day = data.calendar.daysInMonth[state.month];
      }

      if (state.month > data.calendar.monthsInYear) {
        state.month = 1;
        state.year++;
      } else if (state.month <= 0) {
        state.month = data.calendar.monthsInYear;
        state.year--;
      }
    }
  }
}
