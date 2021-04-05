import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import GameScreen from "./pages/game-screen";
import MainMenu from "./pages/main-menu";
import WaitingRoom from "./pages/waiting-room";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Main Menu</Link>
          </li>
          <li>
            <Link to="/waiting-room">Waiting Room</Link>
          </li>
          <li>
            <Link to="/game">Game Screen</Link>
          </li>
        </ul>

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
      </div>
    </Router>
  );
}

export default App;
