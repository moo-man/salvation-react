import React from 'react';
import '../styles/Calendar.css';
import { CalendarHeader } from '../components/calendar/CalendarHeader';
import { CalendarState } from '../models/types';
import { AbstractCalendarController } from '../controllers/AbstractCalendarController';
import { CalendarMonth } from '../components/calendar/CalendarMonth';
import { CalendarYear } from '../components/calendar/CalendarYear';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Campaign } from '../components/campaign/Campaign';

interface CalendarViewProps {
  controller: AbstractCalendarController;
}

class CalendarView extends React.Component<CalendarViewProps, CalendarState> {
  componentDidMount() {
    this.controller.fetchData().then(() => {
      this.setState(this.controller.getCalendarState());
      this.setState({ viewMode: 'month' });
    });
  }

  render(): JSX.Element {
    if (!this.state) {
      return <div></div>;
    }
    let calendarData = this.controller.getCalendarData();
    let operations = {
        changeDay: this.changeDay.bind(this),
        changeMonth: this.changeMonth.bind(this),
        changeYear: this.changeYear.bind(this),
        setDay: this.setDay.bind(this),
        setMonth: this.setMonth.bind(this),
        setYear: this.setYear.bind(this),
        switchViewTo : this.switchViewTo.bind(this)
      }
    return (
      <div className="CalendarView">
        <div className="Calendar">
          <button onClick={this.toggleView.bind(this)}>
            <FontAwesomeIcon icon={faCalendarDay} />
          </button>
          <CalendarHeader name={calendarData.calendar.name}></CalendarHeader>
          {this.state.viewMode === 'month' ? (
            <CalendarMonth
              data={this.controller.getCurrentMonthData()}
              state={this.state}
              mode={'month'}
              operations={operations}
            ></CalendarMonth>
          ) : (
            <CalendarYear
              data={calendarData}
              state={this.state}
              getMonthData={this.controller.getMonthData.bind(this.controller)}
              operations={operations}
            ></CalendarYear>
          )}
        </div>
        <Campaign calendar={this.state} campaign={this.controller.getCampaignData()}></Campaign>
      </div>
    );
  }

  async changeDay (day: number) {
    // Extract this into generic controller?
    this.setState(await this.controller.changeDateBy({ day }));
  };

  async changeMonth (month: number) {
    this.setState(await this.controller.changeDateBy({ month }));
  };


  async changeYear (year: number) {
    this.setState(await this.controller.changeDateBy({ year }));
  };

  async setDay (day: number) {
    // Extract this into generic controller?
    this.setState(await this.controller.setDate({ day }));
  };

  async setMonth (month: number) {
    this.setState(await this.controller.setDate({ month }));
  };


  async setYear (year: number) {
    this.setState(await this.controller.setDate({ year }));
  };



  switchViewTo(view: string) {
    this.setState({ viewMode: view });
  }

  toggleView() {
    this.setState({
      viewMode: this.state.viewMode === 'month' ? 'year' : 'month',
    });
  }

  get controller(): AbstractCalendarController {
    return this.props.controller;
  }
}

export default CalendarView;
