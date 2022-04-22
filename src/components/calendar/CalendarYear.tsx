import React from 'react';
import {
  CalendarData,
  CalendarMonthData,
  CalendarOperations,
  CalendarState,
} from '../../models/types';
import '../../styles/CalendarYear.css';
import { CalendarMonth } from './CalendarMonth';
import { ForwardBackward } from './ForwardBackward';

interface CalendarYearProps {
  data: CalendarData;
  state: CalendarState;
  getMonthData: (month: number, year: number) => CalendarMonthData;
  operations: CalendarOperations
}


export class CalendarYear extends React.Component<CalendarYearProps> {
  render(): JSX.Element {
    let monthViews: JSX.Element[] = [];
    this.props.data.calendar.daysInMonth.forEach(
      (monthDays: number, i: number) => {
        if (monthDays > 0) {
          monthViews.push(
            <CalendarMonth
              onClick={this.handleMonthClick.bind(this)}
              active={this.props.state.month === i}
              mode={'year'}
              key={`${i},${this.props.state.year}`}
              state={this.props.state}
              data={this.props.getMonthData(i, this.props.state.year)}
              operations={this.props.operations}
            ></CalendarMonth>
          );
        }
      }
    );

    return (
      <div className="CalendarYear">
        <header>
          <ForwardBackward
            text={this.props.state.year.toString()}
            onForward={this.handleYearClick.bind(this)}
            onBackward={this.handleYearClick.bind(this)}
          ></ForwardBackward>
        </header>
        <div className="months">
          {monthViews.reduce(
            (prev: JSX.Element, current: JSX.Element): JSX.Element => (
              <>
                {prev}
                {current}
              </>
            ),
            <></>
          )}
        </div>
      </div>
    );
  }

  handleMonthClick(event: React.MouseEvent): void {
    let month = event.currentTarget.getAttribute('data-month');
    if (month)
      this.props.operations.setMonth(parseInt(month))
  }

  handleYearClick(event: React.MouseEvent): void {
    let direction = event.currentTarget.getAttribute('data-type');
    this.props.operations.changeYear(direction === 'forward' ? 1 : -1);
  }
}
