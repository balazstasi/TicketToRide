import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EndScreen from "../pages/end-screen";
import GameScreen from "../pages/game-screen";
import MainMenu from "../pages/main-menu";
import { RulesScreen } from "../pages/rules-screen";
import WaitingRoom from "../pages/waiting-room";

const Routes = ({ children }) => {
  return (
    <Router>
      {children}
      <Switch>
        <Route path="/waiting-room">
          <WaitingRoom />
        </Route>
        <Route path="/game">
          <GameScreen />
        </Route>
        <Route path="/end-game">
          <EndScreen />
        </Route>
        <Route path="/rules">
          <RulesScreen />
        </Route>
        <Route path="/">
          <MainMenu />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
