import React from "react";
import { CalendarMonthData, CalendarState, InterCalData } from "../../models/types";
import { CalendarDay } from "./CalendarDay";

interface InterCalProps {
  data : InterCalData
  parent : CalendarMonthData
  state : CalendarState,
  handleClick : (event: React.MouseEvent) => void
}

export class InterCalDay extends React.Component<InterCalProps> {
  render(): JSX.Element {

    let day = <CalendarDay
            onClick={this.props.handleClick}
            key={this.props.parent.daysInMonth + 1}
            day={this.props.parent.daysInMonth + 1}
            current={this.props.state.month === this.props.parent.number && this.props.state.day === this.props.parent.daysInMonth + 1}
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
}
