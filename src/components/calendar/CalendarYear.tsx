import React from 'react';
import { CalendarData } from '../../models/types';
import '../../styles/CalendarYear.css';
import { CalendarMonth } from './CalendarMonth';

interface CalendarYearProps {
  data: Promise<CalendarData>;
  year: number | null;
}

interface CalendarYearState {
  data?: CalendarData;
  year: number | null;
}

export class CalendarYear extends React.Component<CalendarYearProps,CalendarYearState> {
  constructor(props: CalendarYearProps) {
    super(props);
    this.state = { year: props.year };
  }

  componentDidMount() {
    this.props.data.then((data) => {
      this.setState({ data });
    });
  }

  render(): JSX.Element {
    let monthViews: JSX.Element[] = [];

    if (!this.state.data) return <div></div>;

    if (this.state.data)
    {
      this.state.data.daysInMonth.forEach((monthDays: number, i: number) => {
        if (this.state.data && monthDays > 0)
        {
          monthViews.push(
            <CalendarMonth
              changeDay={(day: Number) => {}}
              key={`${i},${this.props.year}`}
              day={5}
              data={{
                daysInMonth: monthDays,
                daysInWeek: this.state.data.daysInWeek,
              }}
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
