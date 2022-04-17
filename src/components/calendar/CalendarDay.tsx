import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEventHandler } from 'react';
import { Note } from '../../models/Note';
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
                return <span className={markerClass}><FontAwesomeIcon icon={faCircle}/></span>
              })
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
