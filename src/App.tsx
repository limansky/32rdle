import "../node_modules/sanitize.css/sanitize.css";
import "./App.css"

import { Redirect, Route, Router, Switch } from "wouter";
import { parse } from "regexparam";
import { Game } from "./components/Game";
import { GameMode } from "./model/GameMode";
import { HowToPlay } from "./components/HowToPlay";
import { MainMenu } from "./components/menu/MainMenu";
import { idForDate } from "./utils/dictUtils";

function App() {

  const gameParser = (path: string, loose?: boolean): { pattern: RegExp, keys: string[] } => {
    if (path === "/daily/:id") {
      const named = parse(/^\/daily\/(?<id>[0-9]+)$/);
      return { pattern: named.pattern, keys: ['id'] };
    }

    return parse(path, loose);
  };

  return (
    <div className="app">
      <Router parser={gameParser}>
      <Switch>
        <Route path="/"><MainMenu /></Route>
        <Route path="/how-to-play"><HowToPlay /></Route>
        <Route path="/daily/:id">{(params) => <Game mode={GameMode.Daily} dailyId={Number(params.id)} />}</Route>
        <Route path="/today"><Game mode={GameMode.Daily} dailyId={idForDate(new Date())} /></Route>
        <Route><Redirect to="/" /></Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App
