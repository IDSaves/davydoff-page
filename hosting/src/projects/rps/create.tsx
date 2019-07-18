import React, { useState } from "react"
import axios from "axios"

export default () => {
  const [rounds, setRounds] = useState<number>(1)
  const [result, setResult] = useState<number>(1)

  const resultChecker = (res: number) => {
    if (res === 1) return "text-muted"
    else if (res === 2) return "text-danger"
    else if (res === 3) return "text-info"
    else return "text-success"
  }

  const validChecker = async (rounds: number) => {
    if (rounds <= 0) setResult(2)
    else if (rounds > 10) setResult(2)
    else {
      setResult(3)
      try {
        const creation = await axios.get(`https://us-central1-davydoff-84e68.cloudfunctions.net/createRoom?rounds=${rounds}`)
        window.location.href = `/rps/room/${creation.data}`
      }
      catch (e) {
        console.log(e)
        setResult(2)
      }
    }
  }

  return (
    <div className="col-md-6 col-12 rps-form">
      <div className="input-group mt-2">
        <input type="number" className="form-control container-fluid" placeholder="Number of rounds" onChange={(e: any) => setRounds(e.target.value)} value={rounds}/>
        {result !== 3 ? (
          <div className="input-group-append">
            <button className="btn btn-info" type="button" onClick={() => validChecker(rounds)}>Create a room</button>
          </div>
        ) : ""}
      </div>
      <p className={`${resultChecker(result)} mb-0`}>{result === 3 ? "* Loading... *" : "* Valid number of rounds is from 1 to 10 *"}</p>
    </div>
  )
}