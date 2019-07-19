import React, { Fragment } from "react"

export default (props: any) => {
  return (
    <Fragment>
      <p>
        <b>The game is over!<br /></b>
        <span className="text-muted small">You got <span className="text-white">{props.points}</span> points!</span>
      </p>
      <button className="btn btn-dark" onClick={() => props.startGame()}>Replay</button>
    </Fragment>
  )
}