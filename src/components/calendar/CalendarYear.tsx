import React from 'react';
import { CalendarData } from '../../routes/Calendar';
import "../../styles/CalendarYear.css"
import { CalendarMonth } from './CalendarMonth';

interface CalendarYearProps {
  data : CalendarData,
  year : number | null
}


interface CalendarYearState {
  year : number | null
}

export class CalendarYear extends React.Component<CalendarYearProps, CalendarYearState> {

  constructor(props : CalendarYearProps)  
  {
    super(props)
    this.state = {year : props.year}
  }

  render(): JSX.Element {

      let monthViews : JSX.Element[] = []


      this.props.data.daysInMonth.forEach((monthDays, i) => {
        monthViews.push(<CalendarMonth key={`${i},${this.props.year}`} data={{daysInMonth : monthDays, daysInWeek : this.props.data.daysInWeek}}></CalendarMonth>)
      })

      return <div className='CalendarYear'>{monthViews.reduce((prev, current) => <>{prev}{current}</>)}</div>
  }
}
