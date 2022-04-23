import React from "react";
import { Note } from "../../models/Note";

interface NoteDisplayProps {
  notes : Note[]
}

export class NoteDisplay extends React.Component<NoteDisplayProps> {
  render() {
    return <div className="Notes">
      <h3>Notes</h3>
      <ul>
      {this.props.notes.reduce((prev : JSX.Element, current: Note) : JSX.Element=> <>{prev}<li>({current.campaign?.tag}) {current.data.date} - {current.data.content} </li></>, <></>)}
      </ul>
    </div>
  }
}
