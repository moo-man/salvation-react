import React from "react";
import "../styles/Calendar.css"
import { CalendarHeader } from "../components/calendar/CalendarHeader";
import { CalendarState } from "../models/types";
import { AbstractCalendarController } from "../controllers/AbstractCalendarController";
import { CalendarMonth } from "../components/calendar/CalendarMonth";
import { CalendarYear } from "../components/calendar/CalendarYear";


interface CalendarProps {
  controller : AbstractCalendarController
}



class CalendarView extends React.Component<CalendarProps, CalendarState> {

  componentDidMount() {
    this.controller.getDate().then(date => {
      this.setState(date);
    })
  }

  render() : JSX.Element {
    if (!this.state)
    {
      return <div></div>
    }

    console.log("test")
    return <div className="Calendar">
      <CalendarHeader name={this.state.name} date={this.state.date}></CalendarHeader>
      <CalendarMonth data={this.controller.getCurrentMonthData()} day={this.state.day} changeDay={this.changeDay.bind(this)}></CalendarMonth>
      {/* <CalendarYear data={this.controller.getData()} year={this.state.year}></CalendarYear> */}
    </div>
  }


  async changeDay(day : number)
  {
     // Extract this into generic controller?
    this.setState(await this.controller.setDate({day}));
  }

  get controller() : AbstractCalendarController {
    return this.props.controller
  }

}

export default CalendarView;
