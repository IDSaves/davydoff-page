import React from "react"
import { Switch, Route } from "react-router"
import GranimWithReact from "./projects/granim_with_react"
import RPS from "./projects/rps"
import RPSRoom from "./projects/rps/room"
import RPSRoomWithComp from "./projects/rps/room-with-comp"
import FRW from "./projects/frw"
import Lights from "./projects/lights"
import LightsGame from "./projects/lights/game"
import Home from "./components/home"
import NoMatch from "./components/no-match"

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />

      <Route path="/granim-with-react" component={ GranimWithReact } />

      <Route exact path="/rps" component={RPS} />
      <Route path="/rps/room/:key" component={RPSRoom} />
      <Route path="/rps/room-with-computer" component={RPSRoomWithComp} />

      <Route exact path="/frw" component={FRW} />

      <Route exact path="/lights" component={Lights} />
      <Route exact path="/lights/game" component={LightsGame} />
      <Route component={ NoMatch } />
    </Switch>
  )
}


