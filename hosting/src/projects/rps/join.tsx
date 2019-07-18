import React, { useState } from "react"
import db from "../../firebase.config"

export default () => {
  const [key, setKey] = useState<string>("")
  const [result, setResult] = useState<number>(1)

  const resultChecker = (res: number) => {
    if (res === 1) return "text-muted"
    else if (res === 2) return "text-danger"
    else if (res === 3) return "text-info"
    else return "text-success"
  }

  const validChecker = async (key: string) => {
    setResult(3)
    try{
      const room = await db.collection("rps").doc(key).get()
      if (room.exists) window.location.href = `/rps/room/${key}`
      else setResult(2)
    }
    catch (e){
      console.log(e)
      setResult(2)
    }
  }

  return(
    <div className="col-md-6 col-12 rps-form">
      <div className="input-group mt-2">
        <input type="text" className="form-control container-fluid" placeholder="Room key" onChange={(e: any) => setKey(e.target.value)} value={key}/>
        {result !== 3 ? (
          <div className="input-group-append">
            <button className="btn btn-info" type="button" onClick={() => validChecker(key)}>Join a room</button>
          </div>
        ) : ""}
      </div>
      <p className={`${resultChecker(result)} mb-0`}>{result === 3 ? "* Loading... *" : "* Enter only a valid key *"}</p>
    </div>
  )
}