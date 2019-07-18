import React, { useState, useEffect } from "react"
import db from "../firebase.config"
import moment from "moment"

export default ({ setForm }: {[x: string]: any}) => {
  const [show, setShow] = useState<JSX.Element>(<span>Loading...</span>)

  useEffect(() => {
    getPeople()
  }, [])

  const getPeople = async () => {
    const everyone = await db.collection("was_here").where("moderated", "==", true).orderBy("when", "asc").get()
    let people: any[] = []
    everyone.forEach((doc: any) => {
      let data: any = doc.data()
      people = [...people, {
        name: data.name,
        when: data.when.toMillis()
      }]
    })
    people.reverse()
    
    let index: number = 0
    setInterval(() => {
      if (people.length > 0){
        setShow(<span><b>{people[index].name}</b> was here on {moment(people[index].when).format("LL")}</span>)
        if (index === people.length - 1) index = 0
        else index += 1
      }
    }, 1000)
  }

  return (
    <div className="container-fluid was-here text-center" onClick={() => setForm()}>
      {show}
    </div>
  )
}