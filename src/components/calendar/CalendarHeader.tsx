import React from "react";

interface CalendarHeaderProps {
    name : string,
    date? : string
}

export class CalendarHeader extends React.Component<CalendarHeaderProps> {
    
  render() : JSX.Element {
    return <header className="CalendarHeader">
        <h2>{this.props.name}</h2>
        <h3>{this.props.date}</h3>
        </header>;
  }
}

