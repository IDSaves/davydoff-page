import React, { useState, useEffect, Fragment } from "react"
import { Link } from "react-router-dom"
import Keyboard from "./keyboard"
import words from "./words.json" 
import "./index.css"

const rnm = (min: number, max: number) => Math.round(min - 0.5 + Math.random() * (max - min + min))

const useKeyboardEvent = (callback: Function) => {
  useEffect(() => {
    const handler = (event: any) => callback(event.key)
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [callback])
}

var globalLetters: number = 0
var globalLives: number = 5
var globalPoints: number = 0

var mainTimer: any

export default () => {
  const [word, setWord] = useState<number>(rnm(1, 274907))
  const [letters, setLetters] = useState<number>(0)
  const [gameState, setGameState] = useState<string>("menu")
  const [animation, setAnimation] = useState<Boolean>(true)
  const [progressDuration, setProgressDuration] = useState<string>("0s")
  const [lives, setLives] = useState<number>(5)
  const [points, setPoints] = useState<number>(0)
  document.title = "FRW Game - Davydoff's page"

  const startGame = () => {
    clearTimeout(mainTimer)
    globalLives = 5
    globalPoints = 0
    setGameState("running")
    setLives(5)
    setPoints(0)
    resetWord()
  }

  const resetWord = () => {
    let newWord = rnm(1, 274907)
    setWord(newWord)
    setLetters(0)
    setAnimation(true)
    globalLetters = 0

    let lettersLength: number = words[newWord].split("").length
    setProgressDuration(lettersLength * 0.45 + "s")
    mainTimer = setTimeout(() => {
      if (lettersLength !== globalLetters) {
        globalLives -= 1
        setLives(globalLives)
        if (globalLives <= 0) setGameState("ended")
        else {
          setAnimation(false)
          setTimeout(() => resetWord(), 50)
        }
      }
      else {
        setAnimation(false)
        globalPoints += lettersLength
        setPoints(globalPoints)
        setTimeout(() => resetWord(), 50) 
      }
    }, lettersLength * 450)
  }

  const stopGame = () => {
    clearTimeout(mainTimer)
    globalLives = 0
    globalLetters = 0
    setLives(0)
    setGameState("ended")
  }

  useKeyboardEvent((key: string) => handleKey(key))
  const handleKey = (key: string) => {
    if (gameState === "running") {
      if (key !== "Escape"){
        let current: string[] = words[word].split("")
        if (key === current[letters]) {
          globalLetters += 1
          setLetters(letters + 1)
        }
      }
      else stopGame()
    }
  }
  

  return (
    <div className="main-wrapper">
      <Link to="/" className="back-link">Home</Link>
      {gameState === "running" ? (
        <Fragment>
          <p className="frw-stats mb-0">
            <span className="mr-5"><i className="fas fa-heart text-danger" /> {lives}</span> 
            <span><i className="fas fa-certificate text-warning" /> {points}</span><br/>
            <span className="text-muted small">Press "Escape" to stop the game.</span>
          </p>
          <p className="text-muted">{words[word].split("").map((word, i) => (<span key={i} className={i + 1 <= letters ? "done-letter" : ""}>{word}</span>))}</p>
          <div className="progress frw-progress bg-dark">
            <div className={`progress-bar progress-bar-striped progress-bar-animated bg-warning ${animation ? "frw-progress-run" : ""}`} style={{animationDuration: progressDuration}}></div>
          </div>
          <Keyboard mobileKeyEvent={handleKey} />
        </Fragment>
      ) : gameState === "ended" ? (
        <Fragment>
          <p>
            <b>The game is over!<br /></b>
            <span className="text-muted small">You got <span className="text-white">{points}</span> points!</span>
          </p>
          <button className="btn btn-dark" onClick={() => startGame()}>Replay</button>
        </Fragment>  
      ) : (
        <Fragment>
          <div className="frw-logo">
            <i className="fas fa-keyboard" />
          </div>
          <p><b>Fast Running Words</b></p>
          <button className="btn btn-dark" onClick={() => startGame()}>Star the game</button>
        </Fragment>
      )}
    </div>
  )
}