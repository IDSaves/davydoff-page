import React from "react"
import { Link } from "react-router-dom"
import "./index.css"

export default () => {
  return (
    <div className="main-wrapper">
      <Link to="/" className="back-link">Home</Link>

      <div className="lights-logo">
        <i className="fas fa-adjust" />
      </div>
      <p><b>Lights</b></p>
      <p className="small text-muted">This is the game where you need to turn all the lights off.</p>
      <span>
        <Link to="/lights/game"><button className="btn btn-dark mr-3" onClick={() => localStorage.removeItem("lightsGame")}>Star the game</button></Link>
        <Link to="/lights/game"><button className="btn btn-dark">Continue previous</button></Link>
      </span>

    </div>
  )
}