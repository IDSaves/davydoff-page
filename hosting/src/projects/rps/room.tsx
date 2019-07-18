import React, { useState, useEffect, Fragment } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import db from "../../firebase.config"

interface IRound {
  [x: string]: number
}

interface IRoom {
  players: string[]
  rounds: IRound[]
  total_rounds: number
}

export default ({ match }: {[x: string]: any}) => {
  const [roomLoad, setRoomLoad] = useState<[number, string]>([1, ""])
  const [currentIp, setCurrentIp] = useState<string>("")
  const [room, setRoom] = useState<IRoom>({players: [], rounds: [], total_rounds: 0})
  document.title = "RPS room - Davydoff's page"

  useEffect(() => {
    mainFunc()
  }, [])
  
  const mainFunc = async () => {
    let key: string = match.params.key
    if (await roomChecker(key) !== 3) {
      console.log(roomLoad);
      joinRoom(key)
    }
    else return
    try{
      db.collection("rps").doc(key).onSnapshot((doc) => {
        if (!doc.exists){
          setRoomLoad([3, "Room doesn't exist!"])
          return
        }
        let data = doc.data()!
        // console.log("Current data: ", data)
        setRoom({players: data.players, rounds: data.rounds, total_rounds: data.total_rounds})
      })
    }
    catch (e) {
      console.log(e)
      setRoomLoad([3, "Server error!"])
    }
  }

  const roomChecker = async (key: string) => {
    setRoomLoad([2, ""])
    try {
      const room = await db.collection("rps").doc(key).get()
      if (!room.exists) {
        setRoomLoad([3, "Room doesn't exist!"])
        return 3
      }
      let data = room.data()!
      setRoom({players: data.players, rounds: data.rounds, total_rounds: data.total_rounds})
      return 2
    }
    catch (e) {
      console.log(e)
      setRoomLoad([3, "Server error!"])
      return 3
    }
  }

  const joinRoom = async (key: string) => {
    try {
      const joining = await axios.get(`https://us-central1-davydoff-84e68.cloudfunctions.net/joinRoom?key=${key}`)
      if (joining.data === "You can't join this room!") setRoomLoad([3, "You can't join this room!"])
      else {
        setCurrentIp(joining.data)
        setRoomLoad([4, ""])
      }
    }
    catch (e) {
      console.log(e)
      setRoomLoad([3, "Server error!"])
    }
  }

  const makeMove = async (move: number) => {
    if (currentRoundIndex === room.total_rounds) return 
    else {
      let rounds = [...room.rounds]
      rounds[currentRoundIndex][currentIp] = move
      await db.collection("rps").doc(match.params.key).update({rounds: rounds})
    }
  }

  let score: number[] = [0, 0]
  let currentRoundIndex: number = 0
  let currentMoves: any = [(<i className="fas fa-question rps-current-move" />), <i className="fas fa-question rps-current-move" />]
  room.rounds.forEach((round: IRound) => {
    let players: string[] = Object.keys(round)
    let yourMove: number =  0
    let opponentMove: number = 0

    if (Object.keys(round).length === 2) {
      currentRoundIndex += 1
      players.forEach((ip: string) => {
        if (ip === currentIp) yourMove = round[ip]
        else opponentMove = round[ip]
      })
      if (yourMove === 1){
        if (opponentMove === 2) score = [score[0], score[1] + 1]
        else if (opponentMove === 3) score = [score[0] + 1, score[1]]
      }
      else if (yourMove === 2){
        if (opponentMove === 1) score = [score[0] + 1, score[1]]
        else if (opponentMove === 3) score = [score[0], score[1] + 1]
      }
      else if (yourMove === 3){
        if (opponentMove === 1) score = [score[0], score[1] + 1]
        else if (opponentMove === 2) score = [score[0] + 1, score[1]]
      } 
    }

  })

  if (room.rounds.length > 0){
    const activeRound: IRound = room.rounds[currentRoundIndex] ? Object.keys(room.rounds[currentRoundIndex]).length > 0 ? room.rounds[currentRoundIndex] : room.rounds[currentRoundIndex - 1] ? room.rounds[currentRoundIndex - 1] : room.rounds[currentRoundIndex] : room.rounds[currentRoundIndex - 1] 
    const lastRoundPlayers: string[] = Object.keys(activeRound)
    lastRoundPlayers.forEach((ip: string) => {
      let move: number = activeRound[ip] 
      if (ip === currentIp) {
        if (move === 1) currentMoves = [<i className="fas fa-hand-rock rps-current-move rps-rock" />, currentMoves[1]]
        else if (move === 2) currentMoves = [<i className="fas fa-hand-paper rps-current-move rps-paper" />, currentMoves[1]]
        else if (move === 3) currentMoves = [<i className="fas fa-hand-scissors rps-current-move rps-scissors" />, currentMoves[1]]
      }
      else {
        if (move === 1) currentMoves = [currentMoves[0], <i className="fas fa-hand-rock rps-current-move rps-rock" />]
        else if (move === 2) currentMoves = [currentMoves[0], <i className="fas fa-hand-paper rps-current-move rps-paper" />]
        else if (move === 3) currentMoves = [currentMoves[0], <i className="fas fa-hand-scissors rps-current-move rps-scissors" />]
      }
    })
  }

  let content: any
  if (roomLoad[0] === 2) content = <p className="text-info">Loading...</p>
  else if (roomLoad[0] === 3) content = (
    <Fragment>
      <Link to="/rps" className="back-link">Go back</Link>
      <p className="text-danger">{roomLoad[1]}</p>
    </Fragment>
  )
  else {
    if (room.players.length !== 2) content = (
      <Fragment>
      <Link to="/rps" className="back-link">Go back</Link>
      <p className="text-muted mb-0">Waiting for a second player...</p>
      <p className="text-muted rps-small-text"><b>Send this link to your friend!</b></p>
    </Fragment>
    )
    else content = (
      <Fragment>
        <Link to="/rps" className="back-link">Go back</Link>
        <div className="container">
          <p className="mb-0"><b>Round {currentRoundIndex}/{room.total_rounds}</b></p>
          <p className="rps-score mb-0" ><span className="text-success" >{score[0]}</span><span>:</span><span className="text-danger">{score[1]}</span></p>
          <p className="mb-0 your-move">
            <i className="fas fa-hand-rock" onClick={() => makeMove(1)}/>
            <i className="fas fa-hand-paper" onClick={() => makeMove(2)}/>
            <i className="fas fa-hand-scissors" onClick={() => makeMove(3)}/>
          </p>

          <b>
            <p className="rps-make-move">
              {room.rounds[currentRoundIndex] ? room.rounds[currentRoundIndex][currentIp] ? "Waiting for an opponent's move": "Make your move!" : `Game is over! ${score[0] === score[1] ? "It's a draw!" : score[0] > score[1] ? "You won!" : "You lose!"}`}
            </p>
          </b>

          <div className="rps-round mt-5">
            <div className="row">
              <div className="col-6 mb-3">
                <div className="container-fluid" >
                  {currentMoves[0]} 
                </div>
              </div>
              <div className="col-6">
                <div className="container-fluid">
                  {currentMoves[0].props.className !== "fas fa-question rps-current-move" ? currentMoves[1] : <i className="fas fa-question rps-current-move" />}
                </div>
              </div>
            </div>
          </div>

          </div>
        </Fragment>
    )
  }
  
  return (
    <div className="main-wrapper">
      {content}
    </div>
  )
}

