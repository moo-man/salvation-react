import { Campaign } from "./Campaign";
import { Importance, NoteType, Date } from "./types"

export class NoteData {
    content = "";
    importance : Importance = Importance.None;
    date = ""
    campaign : Campaign | null = null
    type: NoteType = NoteType.Normal
}

export class Note {
    active? : boolean;
    distance? : number = 0;
    Day : string = "";

    constructor(public data : NoteData){}

    get type() {
        return this.data.type
    }

    get campaign() {
        return this.data.campaign
    }
    get Date() : Date {
        let [month, day, year] = this.data.date.split(",").map(i => Number(i))
        return {
            month,
            day,
            year
        }
    }

    setDistance(year : number)
    {
        if (this.Date.year)
            this.distance = year - this.Date.year
        
    }
}

