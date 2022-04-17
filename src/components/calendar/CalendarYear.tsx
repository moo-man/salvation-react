import React from 'react';
import { CalendarData, CalendarMonthData, CalendarState } from '../../models/types';
import '../../styles/CalendarYear.css';
import { CalendarMonth } from './CalendarMonth';

interface CalendarYearProps {
  data: CalendarData;
  state: CalendarYearState;
  getMonthData: (month: number) => CalendarMonthData
}

interface CalendarYearState extends CalendarState {
  activeMonth? : number
}

export class CalendarYear extends React.Component<CalendarYearProps,CalendarYearState> {

  constructor(props: CalendarYearProps)
  {
    super(props);
    this.state = props.state;
  }

  render(): JSX.Element {
    let monthViews: JSX.Element[] = [];
    if (this.state)
    {
      this.props.data.calendar.daysInMonth.forEach((monthDays: number, i: number) => {
        if (this.state && monthDays > 0) 
        {
          monthViews.push(
            <CalendarMonth
              onClick={this.handleMonthClick.bind(this)}
              active={this.state.activeMonth === i}
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

  handleMonthClick(event : React.MouseEvent): void
  {
    let month = event.currentTarget.getAttribute("data-month")
    if (event.currentTarget.classList.contains("active"))
    {
      this.setState({activeMonth : undefined})
      return
    }
    
    if (month)
    {
      this.setState({activeMonth : parseInt(month)})
    }
  }
}
