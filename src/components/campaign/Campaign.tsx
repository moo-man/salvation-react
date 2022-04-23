import React from "react";
import { CalendarState, CampaignData } from "../../models/types";
import { NoteDisplay } from "./NoteDisplay";
interface CampaignProps {
    calendar: CalendarState;
    campaign : CampaignData
}

export class Campaign extends React.Component<CampaignProps> {
  render() {
    return <div className="Campaign">
    <header>
        <h2>Active Campaign: {this.props.campaign.active ? this.props.campaign.active.name : "None"}</h2>
        <h3>Current Date: {this.props.campaign.active ? this.props.campaign.active.currentDate : ""}</h3>
        <NoteDisplay notes={this.props.calendar.viewMode === "year" ? this.props.calendar.notes.month : this.props.calendar.notes.day}></NoteDisplay>
        </header>    
    </div>
  }
}
