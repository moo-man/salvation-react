import { faCircle, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEventHandler } from 'react';
import { Note } from '../../models/Note';
import { NoteType } from '../../models/types';
import '../../styles/CalendarDay.css';

interface CalendarDayProps {
  active: boolean;
  onClick: (day: number) => void;
  day: number;
  notes: Note[];
}

export class CalendarDay extends React.Component<CalendarDayProps> {
  render() {
    return (
      <div
        onClick={this.onClick.bind(this)}
        className={`day ${this.props.active ? 'active' : ''}`}
      >
        {this.props.day}
        {this.props.notes ? (
          <div className="notes">
            {this.props.notes
              .map((n) => {
                let markerClass = n.active ? "marker active" : "marker"  
                let opacity = 1 - ((Math.abs(n.distance || 0))/ 4)
                if (opacity <= 0)
                  return undefined
                let icon = faCircle;
                if (n.type === NoteType.Stop)
                  icon = faStop
                if (n.type === NoteType.Start)
                  icon = faPlay
                return <span style={{opacity}} className={markerClass}><FontAwesomeIcon icon={icon}/></span>
              })
              .filter(n => n)
              .reduce(
                (prev, current): JSX.Element => (
                  <>
                    {prev}
                    {current}
                  </>
                ), <></>
              )}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }

  onClick(ev : React.MouseEvent): void {
    this.props.onClick(this.props.day)
  }
}
