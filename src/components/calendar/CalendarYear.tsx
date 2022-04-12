import React from 'react';
import { CalendarData, CalendarMonthData, CalendarState } from '../../models/types';
import '../../styles/CalendarYear.css';
import { CalendarMonth } from './CalendarMonth';

interface CalendarYearProps {
  data: CalendarData;
  state: CalendarState;
  getMonthData: (month: number) => CalendarMonthData
}

export class CalendarYear extends React.Component<CalendarYearProps,CalendarState> {

  constructor(props: CalendarYearProps)
  {
    super(props);
    this.state = props.state;
  }

  render(): JSX.Element {
    let monthViews: JSX.Element[] = [];
    if (this.state)
    {
      this.props.data.daysInMonth.forEach((monthDays: number, i: number) => {
        if (this.state && monthDays > 0)
        {
          monthViews.push(
            <CalendarMonth
              mode={"year"}
              key={`${i},${this.props.state.year}`}
              state={this.props.state}
              data={this.props.getMonthData(i)}
              operations={
                {
                changeDay : (day: number) : void=> {return},
                changeMonth : (number: number) : void=> {return}
                }
              }
            ></CalendarMonth>
          );
        }
      });
    }


    return (
      <div className="CalendarYear">
        {monthViews.reduce((prev : JSX.Element, current : JSX.Element) : JSX.Element => (<>{prev}{current}</>))}
      </div>
    );
  }
}
