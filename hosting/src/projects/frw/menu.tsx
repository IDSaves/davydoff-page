import React, { Fragment } from "react"

export default (props: any) => {
  return (
    <Fragment>
      <div className="frw-logo">
        <i className="fas fa-keyboard" />
      </div>
      <p><b>Fast Running Words</b></p>
      <p className="small text-muted">This is the game where you need to type words as fast as you can.</p>
      <button className="btn btn-dark" onClick={() => props.startGame()}>Star the game</button>
    </Fragment>
  )
}