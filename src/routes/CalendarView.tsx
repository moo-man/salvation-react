import React from 'react';
import '../styles/Calendar.css';
import { CalendarHeader } from '../components/calendar/CalendarHeader';
import { CalendarState } from '../models/types';
import { AbstractCalendarController } from '../controllers/AbstractCalendarController';
import { CalendarMonth } from '../components/calendar/CalendarMonth';
import { CalendarYear } from '../components/calendar/CalendarYear';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

interface CalendarViewProps {
  controller: AbstractCalendarController;
}

class CalendarView extends React.Component<CalendarViewProps, CalendarState> {

  componentDidMount() {
    this.controller.fetchData().then(() => {
      this.setState(this.controller.getCalendarState());
      this.setState({viewMode : "month"})
    });
  }

  render(): JSX.Element {
    if (!this.state) {
      return <div></div>;
    }
    let calendarData = this.controller.getCalendarData()
    return (
      <div className="Calendar">
        <button onClick={this.toggleView.bind(this)}><FontAwesomeIcon icon={faCalendarDay}/></button>
        <CalendarHeader name={calendarData.calendar.name}></CalendarHeader>
        {this.state.viewMode === "month" ? <CalendarMonth 
          data={this.controller.getCurrentMonthData()}
          state={this.state}
          mode={'month'}
          operations={{
            changeDay: this.changeDay,
            changeMonth: this.changeMonth,
          }}></CalendarMonth> 
          : <CalendarYear data={calendarData} state={this.state} getMonthData={this.controller.getMonthData.bind(this.controller)}></CalendarYear>}

      </div>
    );
  }

  changeDay = async (day: number) => {
    // Extract this into generic controller?
    this.setState(await this.controller.setDate({ day }));
  }

  changeMonth = async (number: number) => {
    this.setState(await this.controller.changeDateBy({ month: number }));
  }

  switchViewTo(view : string)
  {
    this.setState({viewMode : view})
  }

  toggleView()
  {
    this.setState({viewMode : this.state.viewMode === "month" ? "year" : "month"})
  }

  get controller(): AbstractCalendarController {
    return this.props.controller;
  }
}

export default CalendarView;
