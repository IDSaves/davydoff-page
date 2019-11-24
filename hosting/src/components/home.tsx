import React, { useState, Fragment } from "react"
import { Link } from "react-router-dom"

export default () => {
  document.body.style.background = "#282c34"
  document.title = "Davydoff's page"

  return(
      <Fragment>
        <div className="main-wrapper">

          <p className="mb-0"><code>D</code>avydoff's page</p>
          <p>
            <a href="https://github.com/IDSaves" className="contact text-muted" target="_blank">
                <i className="fab fa-github" />
            </a>
            <a href="https://vk.com/i_davydoff" className="contact text-muted" target="_blank">
                <i className="fab fa-vk" />
            </a>
            <a href="https://steamcommunity.com/id/Ripper3/" className="contact text-muted" target="_blank">
                <i className="fab fa-steam" />
            </a>
            <span className="contact text-muted" data-placement="bottom" data-toggle="popover" title="Telegram" data-content="@i_davydoff">
                <i className="fab fa-telegram" />
            </span>
            <span className="contact text-muted" data-placement="bottom" data-toggle="popover" title="Discord" data-content="Davydoff#9761">
                <i className="fab fa-discord" />
            </span>
          </p>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-6">
                <Link to="/rps">
                  <div className="projects-link-block p-2 text-center mb-3d"> 
                    <h1><i className="fas fa-hand-scissors" /></h1>
                    <p className="mb-0 text-muted"><b>Rock Paper Scissors</b></p>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-6">
                <Link to="/frw">
                  <div className="projects-link-block p-2 text-center mb-3"> 
                    <h1><i className="fas fa-keyboard" /></h1>
                    <p className="mb-0 text-muted"><b>Fast Running Words</b></p>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-12">
                <Link to="/lights">
                  <div className="projects-link-block p-2 text-center mb-3"> 
                    <h1><i className="fas fa-adjust" /></h1>
                    <p className="mb-0 text-muted"><b>Lights [Beta]</b></p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </Fragment>
  )
}