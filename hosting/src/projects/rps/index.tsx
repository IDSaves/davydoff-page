import React from "react"
import Create from "./create"
import Join from "./join"
import { Link } from "react-router-dom"
import "./index.css"

export default () => {
  document.title = "RPS Game - Davydoff's page"
  
  return(
    <div className="main-wrapper text-center text-white">
      <Link to="/" className="back-link">Go back</Link>
      <div className="rps-logo mt-3">
        <i className="fas fa-hand-rock rps-logo-el" />
        <i className="fas fa-hand-paper rps-logo-el" />
        <i className="fas fa-hand-scissors rps-logo-el" />
      </div>
      <p className="mb-4 "><b><span className="rps-rock">R</span>ock  <span className="rps-paper">P</span>aper <span className="rps-scissors">S</span>cissors</b></p>
      <div className="container">
        
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 rps-game-type">
              <div className="row">
                <p className="col-12 mb-2 rps-game-type-text">Online</p>
                <Create />
                <Join />
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 rps-game-type">
              <div className="row">
                <p className="col-12 mb-2 rps-game-type-text ">Offline</p>
                <div className="col-12 play-with-comp">
                  <Link to="/rps/room-with-computer" className="container-fluid btn btn-info" >Play with computer</Link>
                </div>
              </div>
            </div> 
          </div>
        </div>

        
      </div>
    </div>
  )
}