import React, { useState, Fragment } from "react"
import { Link } from "react-router-dom"
import db from "../firebase.config"
import WasHere from "./was-here"

export default () => {
  const [name, setName] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [show, setShow] = useState<Boolean>(false)
  document.body.style.background = "#282c34"
  document.title = "Davydoff's page"

  const submitName = async () => {
    if (name === "") {
      setResult("Error")
    }
    else {
      setResult("Loading")
      await db.collection("was_here").add({ name: name, moderated: false, when: new Date() })
      setResult("Success")
    }
  }

  return(
      <Fragment>
        <WasHere setForm={() => show ? setShow(false) : setShow(true)} />
        <div className="main-wrapper">

          <div className="was-here-input-block">
            {show ? result === "Success" ? (
                <p className="success-message mt-1 mb-3">Successfully send to moderation!</p>
              ) : result === "Loading" ? (
                <p className="loading-message mt-1 mb-3">Sending...</p>
              ) : (
                <div className="show-was-here-input input-group mt-1 mb-3">
                  <input type="text" className="form-control" placeholder="Your name" onChange={(e: any) => setName(e.target.value)} />
                  <div className="input-group-append">
                    <button className="btn btn-dark" type="button" onClick={() => submitName()}>Was here</button>
                  </div>
                </div>
            ) : ""}
          </div>

          <p className="mb-0"><code>D</code>avydoff's page</p>
          <p>
            <a href="https://github.com/IDSaves" className="contact text-muted" target="_blank"><i className="fab fa-github" /></a>
            <a href="https://vk.com/i_davydoff" className="contact text-muted" target="_blank"><i className="fab fa-vk" /></a>
            <a href="https://steamcommunity.com/id/Ripper3/" className="contact text-muted" target="_blank"><i className="fab fa-steam" /></a>
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