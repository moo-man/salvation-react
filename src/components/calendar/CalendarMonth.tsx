import React from 'react';
import { CalendarDay } from './CalendarDay';
import '../../styles/CalendarMonth.css';
import {
  CalendarMonthData,
  CalendarOperations,
  CalendarState,
} from '../../models/types';
import { InterCalDay } from './InterCalDay';
import { ForwardBackward } from './ForwardBackward';

interface CalendarMonthProps {
  data: CalendarMonthData;
  state: CalendarState;
  mode: string;
  operations: CalendarOperations;
  active?: boolean
  onClick?: (event: React.MouseEvent) => void,
}

export class CalendarMonth extends React.Component<CalendarMonthProps> {


  render(): JSX.Element {
    let html = this.getDayArray();
    let className = `CalendarMonth ${this.props.active ? "active" : ""}`
    return (
      <div className={className} onClick={this.props.onClick} data-month={this.props.data.number}>
        <header>
          {this.props.mode === "month" 
          ? <ForwardBackward text={this.props.data.name} onForward={this.handleMonthClick.bind(this)} onBackward={this.handleMonthClick.bind(this)}></ForwardBackward>
          : <h3>{this.props.data.name}</h3>
        
          }
        </header>
        <div className="days">
          {html.reduce(
            (prev: JSX.Element, current: JSX.Element): JSX.Element => (
              <>
                {prev}
                {current}
              </>
            )
          )}
        </div>
        {this.props.data.intercal && 
        <InterCalDay onClick={this.props.operations.changeDay.bind(this)} parent={this.props.data} state={this.props.state} data={this.props.data.intercal}></InterCalDay>
        }
      </div>
    );
  }


  getDayArray() : JSX.Element[] {
    let weekNum = Math.ceil(
      this.props.data.daysInMonth / this.props.data.daysInWeek
    );
    let html: JSX.Element[] = [];

    for (let i = 0; i < weekNum; i++) {
      let daysInThisWeek =
        i === weekNum - 1
          ? this.props.data.daysInMonth % this.props.data.daysInWeek
          : this.props.data.daysInWeek;
      if (daysInThisWeek === 0) daysInThisWeek = this.props.data.daysInWeek;
      let dayArray: JSX.Element[] = [];

      for (let dayNum = 0; dayNum < daysInThisWeek; dayNum++) {
        let dayInMonth = i * this.props.data.daysInWeek + dayNum + 1;
        let activeDay = false;
        if (
          dayInMonth === this.props.state.day &&
          this.props.state.month === this.props.data.number
        )
        {
          activeDay = true;
        }

        let notes = this.props.data.notes[dayInMonth]
        dayArray.push(
          <CalendarDay
            onClick={this.props.operations.changeDay.bind(this)}
            key={dayInMonth}
            notes={notes}
            day={dayInMonth}
            active={activeDay}
          ></CalendarDay>
        ); // Have to do this to get unique keys
      }

      html.push(
        <div className="week">
          {dayArray.reduce((prev, current) => (
            <>
              {prev}
              {current}
            </>
          ))}
        </div>
      );
    }
    return html
}


  handleMonthClick(event: React.MouseEvent): void {
    let direction = event.currentTarget.getAttribute('data-type');
    this.props.operations.changeMonth(direction === "forward" ? 1 : -1);
  }
}
