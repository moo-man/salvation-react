import React from 'react';
import '../styles/Calendar.css';
import { CalendarHeader } from '../components/calendar/CalendarHeader';
import { CalendarState } from '../models/types';
import { AbstractCalendarController } from '../controllers/AbstractCalendarController';
import { CalendarMonth } from '../components/calendar/CalendarMonth';
import { CalendarYear } from '../components/calendar/CalendarYear';

interface CalendarViewProps {
  controller: AbstractCalendarController;
}

class CalendarView extends React.Component<CalendarViewProps, CalendarState> {
  componentDidMount() {
    this.controller.fetchData().then(() => {
      this.setState(this.controller.getCalendarState());
    });
  }

  render(): JSX.Element {
    if (!this.state) {
      return <div></div>;
    }
    return (
      <div className="Calendar">
        <CalendarHeader name={this.state.name}></CalendarHeader>
        <CalendarYear data={this.controller.getCalendarData()} state={this.state} getMonthData={this.controller.getMonthData.bind(this.controller)}></CalendarYear>
        <CalendarMonth
          data={this.controller.getCurrentMonthData()}
          state={this.state}
          mode={'month'}
          operations={{
            changeDay: this.changeDay,
            changeMonth: this.changeMonth,
          }}
        ></CalendarMonth>
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

  get controller(): AbstractCalendarController {
    return this.props.controller;
  }
}

export default CalendarView;
