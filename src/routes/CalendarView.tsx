import React from "react";
import "../styles/Calendar.css"
import { CalendarHeader } from "../components/calendar/CalendarHeader";
import { CalendarMonth, CalendarMonthData } from "../components/calendar/CalendarMonth";
import { CalendarYear } from "../components/calendar/CalendarYear";
import { Calendar } from "../models/Calendar";

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
  year : number,
  date? : string
}


class CalendarView extends React.Component<CalendarProps, CalendarState> {

  model : Calendar

  constructor(props : CalendarProps)
  {
    super(props);
    this.state = props.data.state;
    this.model = new Calendar(props.data)
  }

  componentDidMount() {
    this.model.getDate().then(date => {
      this.setState(date);
    })
  }

  render() : JSX.Element {
    return <div className="Calendar">
      <CalendarHeader name={this.state.name} date={this.state.date}></CalendarHeader>
      <CalendarMonth data={this.model.getCurrentMonthData()} day={this.state.day} changeDay={this.changeDay.bind(this)}></CalendarMonth>
      {/* <CalendarYear data={this.props.data} year={this.state.year}></CalendarYear> */}
    </div>
  }


  async changeDay(day : number)
  {
     // Extract this into generic controller?
    this.setState(await this.model.setDate({day}));
  }

}

export default CalendarView;
