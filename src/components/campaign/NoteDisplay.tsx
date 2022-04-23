import React from "react";
import { Note } from "../../models/Note";

interface NoteDisplayProps {
  notes : {[key: number] : Note[]}
  mode : string
  title : string
}

export class NoteDisplay extends React.Component<NoteDisplayProps> {
  render() {

    let noteSections = []

    for(let section in this.props.notes)
    {
      let title : string
      if (Number(section) < 0)
        title = `in ${section} years...`
      else if (Number(section) > 0)
        title = `${section} years ago...`
      else 
        title = this.props.mode === "day" ? `On this day` : "This month..."

      noteSections.push(<h4>{title}</h4>)
      noteSections.push(<ul>
        {this.props.notes[section].reduce((prev, current : Note) => <>{prev}<li><b>{current.Day}</b>: ({current.campaign?.tag}) - {current.data.content}</li></>, <></>)}
      </ul>)

    }

    return <div className="Notes">
      <h3>{this.props.title}</h3>
      {noteSections}
    </div>
  }
}
