import React, { MouseEventHandler } from 'react';
import "../../styles/CalendarDay.css"

interface CalendarDayProps {
  current: boolean,
  onClick: (event: React.MouseEvent) => void,
  day : number
}

export function CalendarDay(props : CalendarDayProps) {
  return <div onClick={props.onClick} className={`day ${props.current ? "current" : ""}`} >{props.day}</div>
}