import React from 'react';
import { CalendarState, CampaignData } from '../../models/types';
import { NoteDisplay } from './NoteDisplay';
import "../../styles/Campaign.css"

interface CampaignProps {
  calendar: CalendarState;
  campaign: CampaignData;
  goToCurrentDate: () => void;
}

export class Campaign extends React.Component<CampaignProps> {
  render() {
    let noteViewMode =
      this.props.calendar.viewMode === 'year' ? 'month' : 'day';
    return (
      <div className="Campaign">
        <header>
          <h2>
            Active Campaign:{' '}
            {this.props.campaign.active
              ? this.props.campaign.active.data.name
              : 'None'}
          </h2>
          <h3>
            Current Date:{' '}
            {this.props.campaign.active ? this.props.campaign.date : ''}{' '}
            <button className="calendar-button" onClick={this.props.goToCurrentDate}>Go</button>
          </h3>
          </header>
          <hr></hr>
          <NoteDisplay
            notes={
              noteViewMode === 'month'
                ? this.props.calendar.notes.month
                : this.props.calendar.notes.day
            }
            mode={noteViewMode}
            title={
              this.props.calendar.notes.title[noteViewMode as 'month' | 'day']
            }
          ></NoteDisplay>
      </div>
    );
  }
}
