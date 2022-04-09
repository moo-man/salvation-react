import React from 'react';
import { CalendarDay } from './CalendarDay';
import "../../styles/CalendarMonth.css"

interface CalendarMonthProps {
  data : CalendarMonthData,
  day? : number | null
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
        dayArray.push(<CalendarDay key={(i * daysInWeek) + dayNum}></CalendarDay>) // Have to do this to get unique keys
      }
      
      html.push(
      <div className='week'>
        {dayArray.reduce((prev : JSX.Element, current : JSX.Element) : JSX.Element => <>{prev}{current}</>)}
      </div>)

    }
    return <div className="CalendarMonth">{html.reduce((prev : JSX.Element, current : JSX.Element) : JSX.Element => <>{prev}{current}</>)}</div>;
  }
}
