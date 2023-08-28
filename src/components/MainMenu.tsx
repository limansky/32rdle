import { Link } from "wouter";
import { SimpleHeader } from "./header/SimpleHeader";
import "~/styles/menu.css";

export function MainMenu() {
  return <>
    <SimpleHeader title="32rdle" />
    <div className="main-menu">
      <div className="menu-item">
        <Link href="/today" className="menu-link">Ежедневная игра</Link>
        <p className="menu-subtitle">Отгадывай 32 слова одновременно</p>
      </div>
      <div className="menu-item">
        <Link href="/how-to-play" className="menu-link">Правила игры</Link>
      </div>
    </div>
  </>;
}
