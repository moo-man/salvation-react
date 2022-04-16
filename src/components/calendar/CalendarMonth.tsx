import React from 'react';
import { CalendarDay } from './CalendarDay';
import '../../styles/CalendarMonth.css';
import {
  CalendarMonthData,
  CalendarOperations,
  CalendarState,
} from '../../models/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { InterCalDay } from './InterCalDay';

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
        let current = false;
        if (
          dayInMonth === this.props.state.day &&
          this.props.state.month === this.props.data.number
        )
        {
          current = true;
        }
        dayArray.push(
          <CalendarDay
            onClick={this.handleDayClick.bind(this)}
            key={dayInMonth}
            day={dayInMonth}
            current={current}
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
    let className = `CalendarMonth ${this.props.active ? "active" : ""}`
    return (
      <div className={className} onClick={this.props.onClick} data-month={this.props.data.number}>
        <header>
          {this.props.mode === 'month' ? (
            <button data-value="-1" onClick={this.handleMonthClick.bind(this)}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          ) : (
            <></>
          )}
          <h3>{this.props.data.name}</h3>
          {this.props.mode === 'month' ? (
            <button data-value="1" onClick={this.handleMonthClick.bind(this)}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          ) : (
            <></>
          )}
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
        <InterCalDay handleClick={this.handleDayClick.bind(this)} parent={this.props.data} state={this.props.state} data={this.props.data.intercal}></InterCalDay>
        }
      </div>
    );
  }

  handleDayClick(event: React.MouseEvent): void {
    if (event.currentTarget.textContent)
      this.props.operations.changeDay(
        parseInt(event.currentTarget.textContent)
      );
  }

  handleMonthClick(event: React.MouseEvent): void {
    let value: string | null = event.currentTarget.getAttribute('data-value');

    if (value) {
      let multiplier: number = parseInt(value);

      this.props.operations.changeMonth(multiplier);
    }
  }
}
