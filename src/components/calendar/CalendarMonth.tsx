import React, { MouseEventHandler } from 'react';
import { CalendarDay } from './CalendarDay';
import "../../styles/CalendarMonth.css"
import { CalendarState } from '../../routes/CalendarView';

interface CalendarMonthProps {
  data : CalendarMonthData,
  day? : number | null,
  changeDay : (day: number) => void
}

export interface CalendarMonthData {
  daysInMonth : number,
  daysInWeek : number
}

interface CalendarMonthState {
  day? : number | null
}

export class CalendarMonth extends React.Component<CalendarMonthProps, CalendarMonthState> {

  constructor(props : CalendarMonthProps)  
  {
    super(props)
    this.state = {day : props.day}
  }

  render(): JSX.Element {

    let weekNum = Math.ceil(this.props.data.daysInMonth / this.props.data.daysInWeek)
    let html : JSX.Element[] = []

    for (let i = 0; i < weekNum; i++)
    {
      let daysInWeek = i === weekNum - 1 ? this.props.data.daysInWeek - (this.props.data.daysInMonth % this.props.data.daysInWeek)  : this.props.data.daysInWeek
      let dayArray : JSX.Element[] = [];

      for(let dayNum = 0 ; dayNum < daysInWeek; dayNum++)
      {
        let dayInMonth = (i * daysInWeek) + dayNum + 1
        let current = false;
        if (dayInMonth === this.props.day)
          current = true;
        dayArray.push(<CalendarDay onClick={this.handleDayClick.bind(this)} key={dayInMonth} day={dayInMonth} current={current}></CalendarDay>) // Have to do this to get unique keys
      }
      
      html.push(
      <div className='week'>
        {dayArray.reduce((prev : JSX.Element, current : JSX.Element) : JSX.Element => <>{prev}{current}</>)}
      </div>)

    }
    return <div className="CalendarMonth">{html.reduce((prev : JSX.Element, current : JSX.Element) : JSX.Element => <>{prev}{current}</>)}</div>;
  }

  handleDayClick(event : React.MouseEvent) : void {
    if (event.currentTarget.textContent)
      this.props.changeDay(parseInt(event.currentTarget.textContent))
  }
}
