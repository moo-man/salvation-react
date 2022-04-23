import { Calendar } from '../models/Calendar';
import { Campaign } from '../models/Campaign';
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
              day: this.campaignData?.active?.Date.day || 1,
              month: this.campaignData?.active?.Date.month || 1,
              year: this.campaignData?.active?.Date.year || 1490,
              date: ``,
              notes : {
                month : this.currentMonthNotes(),
                day : this.currentDayNotes(),
                title : this.formatNoteTitle()
              }
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

      this.model.state.date = this.formatDate({day : this.model.state.day, month : this.model.state.month, year : this.model.state.year})

      this.model.state.notes.month = this.currentMonthNotes()
      this.model.state.notes.day = this.currentDayNotes()
      this.model.state.notes.title = this.formatNoteTitle()

      return this.model.state;
    } else throw Error('No Calendar Model');
  }

  changeDateBy(date: Date): CalendarState {
    if (this.model) {
      this.model.state.day += date.day || 0;
      this.model.state.month += date.month || 0;
      this.model.state.year += date.year || 0;

      this.model.state.date = this.formatDate({day : this.model.state.day, month : this.model.state.month, year : this.model.state.year})
      
      this.checkStateChange();

      this.model.state.notes.month = this.currentMonthNotes()
      this.model.state.notes.day = this.currentDayNotes()
      this.model.state.notes.title = this.formatNoteTitle()


      return this.model.state;
    } else throw Error('No Calendar Model');
  }

  formatNoteTitle() : {month : string, day : string}
  {
    if (this.model)
    {
      
      return {
        "month" : "Notes for " + this.formatDate({month : this.model.state.month, year : this.model.state.year}),
        "day" : "Notes for " + this.formatDate({day : this.model.state.day, month : this.model.state.month, year : this.model.state.year}) 
      }
    }
    else return {
      "month" : "Notes",
      "day" : "Notes"
    }
  }

  formatDate(date : Date) : string
  {
    let day = ""

    if (date.day?.toString().split("").pop() === "1" && date.day !== 11)
    {
      day = `${date.day}st`
    }
    else if (date.day?.toString().split("").pop() === "2" && date.day !== 12)
    {
      day = `${date.day}nd`
    }
    else if (date.day?.toString().split("").pop() === "3" && date.day !== 13)
    {
      day = `${date.day}rd`
    }
    else if(date.day) day = `${date.day}th`
    
    return `${day} ${date.month ? this.model?.monthNames[date.month] : ""} ${date.year ? date.year : ""}`.trim()

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

  getCampaignData() : CampaignData {
    if (this.campaignData)
      return {...this.campaignData}
    else 
      throw Error("No Campaign Data")
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
        notes: this.getMonthNotes(month).map(n => {
          n.setDistance(year)
          return n
        })
      };
    } else throw Error('No Calendar Model');
  }
  getMonthNotes(month: number, year? : number): Note[] {
    return this.notesAtDate({month, year})
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


      if (state.month > definition.monthsInYear) {
        state.month = 1;
        state.year++;
      } else if (state.month <= 0) {
        state.month = definition.monthsInYear;
        state.year--;
      }

      if (state.day > this.model.daysInMonth(state.month, state.year)) {
        state.month++;
        state.day = 1;
      }

      if (state.day <= 0) {
        state.month--;
        state.day = this.model.daysInMonth(state.month, state.year);
      }
    }
  }

  loadCampaignData(data: any) {
    this.campaignData = {
      notes: [],
      campaigns: {},
    };
    for (let campaign of data.CampaignList) {
      let campaignObj = {
      name: campaign.Name as string,
      currentDate: TestHarptosCalendar.convertStringDate(
        campaign.CurrentDate
        ),
        tag: campaign.Tag as string,
      };
      this.campaignData.campaigns[campaign.Tag] = new Campaign(campaignObj)

      campaign.notes[0].start = true;
      campaign.notes[campaign.notes.length-1].end = true;

      for (let note of campaign.notes) {
        let date = TestHarptosCalendar.convertStringDate(note.Date);
        let noteData = {
          content: note.NoteContent as string,
          date,
          importance: parseInt(note.Importance),
          campaign : this.campaignData.campaigns[campaign.Tag],
          type: NoteType.Normal
        };

        if (note.start)
          noteData.type = NoteType.Start

        if (note.end)
          noteData.type = NoteType.Stop


        let noteObj = new Note(noteData)
        this.campaignData?.notes.push(noteObj)

      }
    }
  }

  setActiveCampaign(campaignTag: string): void {
    if (this.campaignData) {
      this.campaignData.active = this.campaignData.campaigns[campaignTag];
      this.campaignData.notes.forEach(n => n.active = n.campaign?.tag === campaignTag)
      this.campaignData.date = this.formatDate(this.campaignData.active.Date)
    }
  }

  static convertStringDate(date: string): string {
    let dateSplit = date.split('');
    return `${dateSplit[0]}${dateSplit[1]},${dateSplit[2]}${dateSplit[3]},${dateSplit[4]}${dateSplit[5]}${dateSplit[6]}${dateSplit[7]}`;
  }

  currentMonthNotes() : {[key: number] : Note[]}
  {
    if (this.model)
    {
      return this.organizeNotes(this.notesAtDate({month : this.model.state.month}))
    }
    else return []
  }

  currentDayNotes() : {[key: number] : Note[]}
  {
    if (this.model)
    {
      return this.organizeNotes(this.notesAtDate({month : this.model.state.month, day: this.model.state.day}))
    }
    else return []
  }


  static dateSorter(a : Date, b : Date) : number {
    if (a.year && b.year)
    {
      if (a.year > b.year) return -1
      else if (a.year < b.year) return 1
    }
    else return 0

    if (a.month && b.month)
    {
      if (a.month > b.month) return -1
      else if (a.month < b.month) return 1
    }
    else return 0

    if (a.day && b.day)
    {
      if (a.day > b.day) return -1
      else if (a.day < b.day) return 1
    }
    return 0
  }

  
  organizeNotes(notes : Note[]) : {[key: number] : Note[]}
  {
    let organized : {[key: number] : Note[]} = {}
    if (!this.model)
      return []
    for (let note of notes)
    {
      note.setDistance(this.model?.state.year);
      note.Day = (this.formatDate({day : note.Date.day}))
      if (!organized[note.distance!])
        organized[note.distance!] = []

      organized[note.distance!].push(note);
    }
    return organized
  }

  notesAtDate(date : Date):  Note[] {
    let notes : Note[] = this.campaignData?.notes || []

    if (date.year)
    {
      notes = notes.filter(n => n.Date.year === date.year)
    }

    if (date.month)
    {
      notes = notes.filter(n => n.Date.month === date.month)
    }

    if (date.day)
    {
      notes = notes.filter(n => n.Date.day === date.day)
    }

    return notes.sort((a, b) => {
      return TestHarptosCalendar.dateSorter(b.Date, a.Date)
    })
  }

}
