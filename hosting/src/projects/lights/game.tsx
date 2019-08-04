import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const rnd = () => Math.round(0 - 0.5 + Math.random() * (1 - 0 + 1)) ? true : false

export default () => {
  const [places, setPlaces] = useState<boolean[][]>([
    [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
    [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
    [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
    [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
    [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()]
  ])
  const [won, setWon] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem("lightsGame")) {
      let tmp: boolean[][] = JSON.parse(localStorage.getItem("lightsGame")!)
      let ended = true
      for (let rowPlace in tmp) {
        for (let indexPlace in tmp[rowPlace]) {
          if (tmp[rowPlace][indexPlace]) ended = false 
        }
      } 
      if (ended) {
        setPlaces(([
          [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
          [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
          [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
          [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
          [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()]
        ]))
      }
      else setPlaces(JSON.parse(localStorage.getItem("lightsGame")!))
    }
    else {
      let tmp: boolean[][] = [
        [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
        [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
        [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
        [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
        [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()]
      ] 
      setPlaces(tmp)
      localStorage.setItem("lightsGame", JSON.stringify(tmp))
    }
  }, [])

  const restartGame = () => {
    let tmp: boolean[][] = [
      [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
      [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
      [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
      [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
      [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()]
    ] 
    setPlaces(tmp)
    localStorage.setItem("lightsGame", JSON.stringify(tmp))
  }

  const handleClick = (row: number, index: number) => {
    let tmp: boolean[][] = places.slice(0);
    tmp[row][index] = !tmp[row][index]
    if (row === 0){
      if (index === 0) tmp[row][index + 1] = !tmp[row][index + 1]
      else if (index === 6) tmp[row][index - 1] = !tmp[row][index - 1]
      else {
        tmp[row][index - 1] = !tmp[row][index - 1]
        tmp[row][index + 1] = !tmp[row][index + 1]
      }
      tmp[row + 1][index] = !tmp[row + 1][index]
    }
    else if (row === 4){
      if (index === 0) tmp[row][index + 1] = !tmp[row][index + 1]
      else if (index === 6) tmp[row][index - 1] = !tmp[row][index - 1]
      else {
        tmp[row][index - 1] = !tmp[row][index - 1]
        tmp[row][index + 1] = !tmp[row][index + 1]
      }
      tmp[row - 1][index] = !tmp[row - 1][index]
    }
    else {
      if (index === 0) tmp[row][index + 1] = !tmp[row][index + 1]
      else if (index === 6) tmp[row][index - 1] = !tmp[row][index - 1]
      else {
        tmp[row][index - 1] = !tmp[row][index - 1]
        tmp[row][index + 1] = !tmp[row][index + 1]
      }
      tmp[row + 1][index] = !tmp[row + 1][index]
      tmp[row - 1][index] = !tmp[row - 1][index]
    }
    setPlaces(tmp);
    let ended = true
    for (let rowPlace in tmp) {
      for (let indexPlace in tmp[rowPlace]) {
        if (tmp[rowPlace][indexPlace]) ended = false 
      }
    } 
    if (ended) setWon(true)
    localStorage.setItem("lightsGame", JSON.stringify(tmp))
  }
  
  return (
    <div className="main-wrapper">
      <Link to="/lights" className="back-link">Back</Link>

      {won && <h1 className="mb-3">You won!</h1>}
      
      <p className="mb-1">
        {places[0].map((place, i) => <i key={i} className={`lights-place ${place ? "fas" : "far"} fa-square ${i === 6 ? "" : "mr-3"}`} onClick={() => handleClick(0, i)} /> )}
      </p>
      <p className="mb-1">
        {places[1].map((place, i) => <i key={i} className={`lights-place ${place ? "fas" : "far"} fa-square ${i === 6 ? "" : "mr-3"}`} onClick={() => handleClick(1, i)} /> )}
      </p>
      <p className="mb-1">
        {places[2].map((place, i) => <i key={i} className={`lights-place ${place ? "fas" : "far"} fa-square ${i === 6 ? "" : "mr-3"}`} onClick={() => handleClick(2, i)} /> )}
      </p>
      <p className="mb-1">
        {places[3].map((place, i) => <i key={i} className={`lights-place ${place ? "fas" : "far"} fa-square ${i === 6 ? "" : "mr-3"}`} onClick={() => handleClick(3, i)} /> )}
      </p>
      <p className="mb-1">
        {places[4].map((place, i) => <i key={i} className={`lights-place ${place ? "fas" : "far"} fa-square ${i === 6 ? "" : "mr-3"}`} onClick={() => handleClick(4, i)} /> )}
      </p>

      <button className="btn btn-dark mt-5" onClick={restartGame}>Restart the game</button>
   </div>
  )
}