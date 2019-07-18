const cors = require('cors')({origin: true})
const functions = require('firebase-functions')

const Firestore = require('@google-cloud/firestore')
const firestore = new Firestore({
    projectId: 'davydoff-84e68'
})

exports.test = functions.https.onRequest((request: any, response: any) => {
  response.send("Test")
})

exports.createRoom = functions.https.onRequest((request: any, response: any) => {
  const rounds: any = Number(request.query.rounds)
  const ip: string = request.headers['x-forwarded-for'] || request.connection.remoteAddress
  cors(request, response, async () => {
    if (rounds && rounds === parseInt(rounds, 10) && rounds > 0 && rounds <= 10) {
      let roundsList = []
      for (let i = 0; i < rounds; i++) roundsList.push({})
      let snapshot = await firestore.collection('rps').add({ total_rounds: rounds, players: [ip], rounds: roundsList })
      response.send(snapshot._path.segments[1])
    }
    else {
      response.send("Rounds number error")
    }
  })
})

exports.joinRoom = functions.https.onRequest((request: any, response: any) => {
  const key: string = request.query.key
  const ip: string = request.headers['x-forwarded-for'] || request.connection.remoteAddress
  cors(request, response, async () => {
    if (key) {
      let document = await firestore.collection('rps').doc(String(key)).get()
      let data = document.data()
      let players = data.players

      if (players.length === 2 && !players.includes(ip)) response.send("You can't join this room!")
      if (players.length === 2 && players.includes(ip)) response.send(ip)
      if (players.length === 1 && players.includes(ip)) response.send(ip)
      if (players.length === 1 && !players.includes(ip)) {
        await firestore.collection('rps').doc(String(key)).set({
          players: [...players, ip]
        }, {merge: true})
        response.send(ip)
      }
    }
    else {
      response.send("No key provided")
    }
  })
})
