import React, { useState } from "react"
import { Link } from "react-router-dom"

export default () => {
    const [score, setScore] = useState<number[]>([0, 0])
    const [moves, setMoves] = useState<number[]>([0, 0])
    document.title = "RPS room - Davydoff's page"

    const makeMove = (move: number) => {
        setMoves([move, 0])
        setTimeout(() => {
          const comp_move: number = Math.round(1 - 0.5 + Math.random() * (3 - 1 + 1))
          if (move === 1){
              if (comp_move === 2) setScore([score[0], score[1] + 1])
              else if (comp_move === 3) setScore([score[0] + 1, score[1]]) 
          }
              else if (move === 2){
              if (comp_move === 1) setScore([score[0] + 1, score[1]])
               else if (comp_move === 3) setScore([score[0], score[1] + 1])
          }
              else if (move === 3){
              if (comp_move === 1) setScore([score[0], score[1] + 1])
              else if (comp_move === 2) setScore([score[0] + 1, score[1]])
          }
          setMoves([move, comp_move]) 
        }, 500)
    }

    return (
        <div className="main-wrapper">
            <Link to="/rps" className="back-link">Go back</Link>
            <div className="container">
            <p className="rps-score mb-0" ><span className="text-success" >{score[0]}</span><span>:</span><span className="text-danger">{score[1]}</span></p>
            <p className="mb-0 your-move">
                <i className="fas fa-hand-rock" onClick={() => makeMove(1)} />
                <i className="fas fa-hand-paper" onClick={() => makeMove(2)} />
                <i className="fas fa-hand-scissors" onClick={() => makeMove(3)} />
            </p>

            <div className="rps-round mt-5">
                <div className="row">
                <div className="col-6 mb-3">
                    <div className="container-fluid" >
                    {
                        moves[0] === 0 ?
                        <i className="fas fa-question rps-current-move" /> :
                        moves[0] === 1 ? 
                        <i className="fas fa-hand-rock rps-current-move rps-rock" /> :
                        moves[0] === 2 ? 
                        <i className="fas fa-hand-paper rps-current-move rps-paper" /> : 
                        <i className="fas fa-hand-scissors rps-current-move rps-scissors" />
                    } 
                    </div>
                </div>
                <div className="col-6">
                    <div className="container-fluid">
                    {
                        moves[1] === 0 ?
                        <i className="fas fa-question rps-current-move" /> :
                        moves[1] === 1 ? 
                        <i className="fas fa-hand-rock rps-current-move rps-rock" /> :
                        moves[1] === 2 ? 
                        <i className="fas fa-hand-paper rps-current-move rps-paper" /> : 
                        <i className="fas fa-hand-scissors rps-current-move rps-scissors" />
                    } 
                    </div>
                </div>
                </div>
            </div>

            </div>
        </div>
    )
}