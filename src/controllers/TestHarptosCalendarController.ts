import { Calendar } from '../models/Calendar';
import { Note } from '../models/Note';
import {
  CalendarData,
  CalendarMonthData,
  CalendarState,
  CampaignData,
  Date,
  InterCalData,
  NoteType,
} from '../models/types';
import { AbstractCalendarController } from './AbstractCalendarController';

export class TestHarptosCalendar extends AbstractCalendarController {
  protected model: Calendar | null = null;
  protected campaignData: CampaignData | null = null;

  async fetchData(): Promise<void> {
    return new Promise((resolve) => {
      fetch('/data.json')
        .then((json) => json.json())
        .then((data) => {
          this.loadCampaignData(data);
          this.setActiveCampaign("TOA")
          this.model = new Calendar({
            calendar: {
              name: 'Calendar of Harptos',
              intercal: [
                { name: 'Midwinter', date : {month: 1, day: 31} },
                { name: 'Greengrass', date : {month: 4, day: 31} },
                { name: 'Shieldmeet', date : {month: 7, day: 31}, leap: true },
                { name: 'Highharvestide', date : {month: 9, day: 31} },
                { name: 'Feast of the Moon', date : {month: 11, day: 31} },
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
              daysInMonth: [0, 31, 30, 30, 31, 30, 30, 31, 30, 31, 30, 31, 30],
              daysInWeek: 10,
              leapYear: {
                date : {day: 31, month: 7},
                recurrence: 4,
              },
            },
            state: {
              day: 1,
              month: 1,
              year: 1490,
              date: ``,
            },
          });
          this.dataLoaded = true;
          resolve();
        });
    });
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
      return {calendar : this.model.definition, state : this.model.state};
    } else throw Error('No Calendar Model');
  }

  getCurrentMonthData(): CalendarMonthData {
    if (this.model) {
      return this.getMonthData(this.model.state.month, this.model.state.year);
    } else throw Error('No Calendar Model');
  }

  getMonthData(month: number, year : number): CalendarMonthData {
    if (this.model) {
      return {
        daysInMonth: this.model.daysInMonth(month, year),
        daysInWeek: this.model.daysInWeek,
        name: this.model.monthNames[month],
        year,
        number: month,
        intercal: this.getIntercalData(month, year),
        notes: this.getMonthNotes(month, year),
      };
    } else throw Error('No Calendar Model');
  }
  getMonthNotes(month: number, year : number): { [key: string]: Note[] } {
    let monthNotes: { [key: string]: Note[] } = {};
    Object.keys(this.campaignData?.notes || {})
      .filter((date) => Number(date.split(',')[0]) === month)
      .forEach((date) => {
        let day = Number(date.split(',')[1]).toString();

        if (this.campaignData) {
          if (monthNotes[day]) {
            monthNotes[day] = monthNotes[day].concat(
              this.campaignData.notes[date].map(n => {
                let noteYear = Number(n.date.split(",")[2].toString());
                n.distance = year - noteYear;
                if (!n.campaign)
                  n.distance = 0
                return n
              })
            );
          } else {
            monthNotes[day] = this.campaignData.notes[date].map(n => {
              let noteYear = Number(n.date.split(",")[2].toString());
              n.distance = year - noteYear;
              if (!n.campaign)
                n.distance = 0
              return n
            });
          }
        }
      });
    return monthNotes;
  }

  getIntercalData(month: number, year: number): InterCalData[] {
    if (this.model) {
      return this.model.intercalInMonth(month, year);
    }
    else 
      throw new Error("No Calendar Model")
  }

  checkStateChange(): void {
    if (this.model) {
      let state = this.model.state;
      let definition = this.model.definition;

      if (state.day > this.model.daysInMonth(state.month, state.year)) {
        state.month++;
        state.day = 1;
      }

      if (state.day <= 0) {
        state.month--;
        state.day = this.model.daysInMonth(state.month, state.year);
      }

      if (state.month > definition.monthsInYear) {
        state.month = 1;
        state.year++;
      } else if (state.month <= 0) {
        state.month = definition.monthsInYear;
        state.year--;
      }
    }
  }

  loadCampaignData(data: any) {
    this.campaignData = {
      notes: {},
      campaigns: {},
    };
    for (let campaign of data.CampaignList) {
      this.campaignData.campaigns[campaign.Tag] = {
        name: campaign.Name,
        currentDate: TestHarptosCalendar.convertStringDate(
          campaign.CurrentDate
        ),
        tag: campaign.Tag,
      };

      campaign.notes[0].start = true;
      campaign.notes[campaign.notes.length-1].end = true;

      for (let note of campaign.notes) {
        let date = TestHarptosCalendar.convertStringDate(note.Date);
        let noteData = {
          content: note.NoteContent,
          date,
          importance: parseInt(note.Importance),
          campaign: campaign.Tag as string,
          type: NoteType.Normal
        };

        if (note.start)
          noteData.type = NoteType.Start

        if (note.end)
          noteData.type = NoteType.Stop

        if (this.campaignData.notes[date]?.length) {
          this.campaignData.notes[date].push(noteData);
        } else {
          this.campaignData.notes[date] = [noteData];
        }
      }
    }
  }

  setActiveCampaign(campaignTag: string): void {
    if (this.campaignData) {
      this.campaignData.active = this.campaignData.campaigns[campaignTag];
      Object.values(this.campaignData.notes)
        .reduce((prev, current): Note[] => current.concat(prev), [])
        .forEach((n) => {
          if (n.campaign === campaignTag) n.active = true;
        });
    }
  }

  static convertStringDate(date: string): string {
    let dateSplit = date.split('');
    return `${dateSplit[0]}${dateSplit[1]},${dateSplit[2]}${dateSplit[3]},${dateSplit[4]}${dateSplit[5]}${dateSplit[6]}${dateSplit[7]}`;
  }
}
