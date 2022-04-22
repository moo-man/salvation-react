import React from 'react';
import { CalendarDay } from './CalendarDay';
import '../../styles/CalendarMonth.css';
import {
  CalendarMonthData,
  CalendarOperations,
  CalendarState,
  InterCalData,
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
    let header = `${this.props.data.name} ${this.props.data.year}`
    return (
      <div className={className} onClick={this.props.onClick} onDoubleClick={this.handleMonthDoubleClick.bind(this)} data-month={this.props.data.number}>
        <header>
          {this.props.mode === "month" 
          ? <ForwardBackward text={header} onForward={this.handleMonthClick.bind(this)} onBackward={this.handleMonthClick.bind(this)}></ForwardBackward>
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
        {this.getInterCalElement()}
      </div>
    );
  }

  getInterCalElement() : JSX.Element {
    return this.props.data.intercal.reduce((prev : JSX.Element, current : InterCalData) => {
      return <>
      {prev}
      <InterCalDay onClick={this.props.operations.setDay.bind(this)} parent={this.props.data} state={this.props.state} data={current}></InterCalDay>
      </>
    }, <></>)
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

        if (!this.props.data.intercal.find(i => i.date.day === dayInMonth))
        {
          dayArray.push(
            <CalendarDay
              onClick={this.props.mode === "month" ? this.props.operations.setDay.bind(this) : (() => {})}
              key={dayInMonth}
              notes={notes}
              day={dayInMonth}
              active={this.props.mode === "month" ? activeDay : false}
            ></CalendarDay>
          ); // Have to do this to get unique keys
        }

      }

      html.push(
        <div className="week">
          {dayArray.reduce((prev, current) => (
            <>
              {prev}
              {current}
            </>
          ), <></>)}
        </div>
      );
    }
    return html
}


  handleMonthClick(event: React.MouseEvent): void {
    let direction = event.currentTarget.getAttribute('data-type');
    this.props.operations.changeMonth(direction === "forward" ? 1 : -1);
  }

  handleMonthDoubleClick(event : React.MouseEvent) : void {
    if (this.props.mode === "year")
      this.props.operations.switchViewTo("month")
  }
}
