import React, { Fragment } from "react"
import Keyboard from "./keyboard"

export default (props: any) => {
  return (
    <Fragment>
      <p className="frw-stats mb-0">
        <span className="mr-5"><i className="fas fa-heart text-danger" /> {props.lives}</span> 
        <span><i className="fas fa-certificate text-warning" /> {props.points}</span><br/>
        <span className="text-muted small">Press "Escape" to stop the game.</span>
      </p>
      <p className="text-muted">{props.words[props.word].split("").map((word: string, i: number) => (<span key={i} className={i + 1 <= props.letters ? "done-letter" : ""}>{word}</span>))}</p>
      <div className="progress frw-progress bg-dark">
        <div className={`progress-bar progress-bar-striped progress-bar-animated bg-warning ${props.animation ? "frw-progress-run" : ""}`} style={{animationDuration: props.progressDuration}}></div>
      </div>
      <Keyboard mobileKeyEvent={props.handleKey} />
    </Fragment>
  )
}