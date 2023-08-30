import "../node_modules/sanitize.css/sanitize.css";
import "./App.css"

import { Redirect, Route, Router, Switch } from "wouter";
import { Game } from "./components/Game";
import { GameMode } from "./model/GameMode";
import { HowToPlay } from "./components/HowToPlay";
import { MainMenu } from "./components/MainMenu";
import makeMatcher, { Match } from "wouter/matcher";
import { idForDate } from "./utils/words";

function App() {

  const defMatcher = makeMatcher()

  const gameMatcher = (pattern: string, path: string): Match => {
    const [m, k] = defMatcher(pattern, path);

    if (m) {
      for (let p in k) {
        if (p.startsWith('num_') && !/^\d+$/.test(k[p]!)) return [false, null];
      }
      return [true, k];
    }

    return [ false, null ];
  };

  return (
    <div className="app">
      <Router matcher={gameMatcher}>
      <Switch>
        <Route path="/"><MainMenu /></Route>
        <Route path="/how-to-play"><HowToPlay /></Route>
        <Route path="/daily/:num_id">{(params) => <Game mode={GameMode.Daily} dailyId={Number(params.num_id)} />}</Route>
        <Route path="/today"><Game mode={GameMode.Daily} dailyId={idForDate(new Date())} /></Route>
        <Route><Redirect to="/" /></Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App
