import React from "react";

interface CalendarHeaderProps {
    name : string
}

export class CalendarHeader extends React.Component<CalendarHeaderProps> {
    
  render() : JSX.Element {
    return <header className="CalendarHeader">
        <h2>{this.props.name}</h2>
        </header>;
  }
}

