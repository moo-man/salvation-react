import React from "react";
import "../styles/Calendar.css"
import { CalendarHeader } from "../components/calendar/CalendarHeader";
import { CalendarMonth, CalendarMonthData } from "../components/calendar/CalendarMonth";
import { CalendarYear } from "../components/calendar/CalendarYear";

export interface CalendarData {

  monthsInYear :  number
  daysInYear : number
  daysInMonth : number[]
  daysInWeek : number,
  leapYear : {
    month : number,
    recurrence : number
  },
  state : CalendarState
}

interface CalendarProps {
  data : CalendarData
}

export interface CalendarState {
  name : string,
  day : number,
  month: number,
  year : number
}


class Calendar extends React.Component<CalendarProps, CalendarState> {

  constructor(props : CalendarProps)
  {
    super(props);
    this.state = props.data.state
  }

  render() : JSX.Element {
    return <div className="Calendar">
      <CalendarHeader name={this.state.name}></CalendarHeader>
      <CalendarMonth data={this.getCurrentMonthData()} day={this.state.day}></CalendarMonth>
      {/* <CalendarYear data={this.props.data} year={this.state.year}></CalendarYear> */}
    </div>
  }

  getCurrentMonthData() : CalendarMonthData {
    return {
      daysInMonth : this.props.data.daysInMonth[this.state.month],
      daysInWeek : this.props.data.daysInWeek
    }
  }
}

export default Calendar;
