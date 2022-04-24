import React from "react";
import "../../styles/CalendarHeader.css"

interface CalendarHeaderProps {
    name : string,
    year : string
}

export class CalendarHeader extends React.Component<CalendarHeaderProps> {
    
  render() : JSX.Element {
    return <header className="CalendarHeader">
        <h2>{this.props.name}</h2>
        <h3>{this.props.year}</h3>
        </header>;
  }
}

