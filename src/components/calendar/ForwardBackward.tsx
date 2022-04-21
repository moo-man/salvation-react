import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../../styles/ForwardBackward.css';


interface ForwardBackwardProps {
  text : string
  onForward : (ev : React.MouseEvent) => void
  onBackward : (ev : React.MouseEvent) => void
}


export class ForwardBackward extends React.Component<ForwardBackwardProps> {
  
  render(): JSX.Element {
    return <div className="direction-controls">
      <button data-type="backward" onClick={this.props.onBackward}><FontAwesomeIcon icon={faChevronLeft} /></button>    
      <h3>{this.props.text}</h3>
      <button data-type="forward" onClick={this.props.onForward}><FontAwesomeIcon icon={faChevronRight} /></button>
    </div>
  }
}
