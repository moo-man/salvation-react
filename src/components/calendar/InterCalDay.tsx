import React from "react";
import { CalendarMonthData, CalendarState, InterCalData } from "../../models/types";
import { CalendarDay } from "./CalendarDay";

interface InterCalProps {
  data : InterCalData
  parent : CalendarMonthData
  state : CalendarState,
  onClick : (day: number) => void
}

export class InterCalDay extends React.Component<InterCalProps> {
  render(): JSX.Element {

    let day = <CalendarDay
            onClick={this.props.onClick.bind(this)}
            key={this.props.parent.daysInMonth}
            day={this.props.parent.daysInMonth}
            active={this.props.state.month === this.props.parent.number && this.props.state.day === this.props.parent.daysInMonth}
            notes={this.props.parent.notes.filter(n => n.Date.day === this.props.parent.daysInMonth)}
          ></CalendarDay>

    return (
      <div className="InterCal">
        <header>
          <h3>{this.props.data.name}</h3>
        </header>
        <div className="days">
          {day}
        </div>
      </div>
    );
  }

  onClick(ev : React.MouseEvent): void {
    this.props.onClick(this.props.parent.daysInMonth)
  }
}
