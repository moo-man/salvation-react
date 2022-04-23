import { Date } from "./types";


class CampaignData {
    name  = "";
    tag = "";
    currentDate  = "";
}

export class Campaign {
    

    constructor(public data : CampaignData){}


    get Date() : Date {
        let [month, day, year] = this.data.currentDate.split(",").map(i => Number(i))
        return {
            month,
            day,
            year
        }
    }

    get tag() {
        return this.data.tag
    }

}