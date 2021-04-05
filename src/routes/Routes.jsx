import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameScreen from "../pages/game-screen";
import MainMenu from "../pages/main-menu";
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
        <Route path="/">
          <MainMenu />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
