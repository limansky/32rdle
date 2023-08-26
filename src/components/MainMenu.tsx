import { Link } from "wouter";
import { SimpleHeader } from "./header/SimpleHeader";
import "~/styles/menu.css";

export function MainMenu() {
  return <>
    <SimpleHeader/>
    <ul className="main-menu">
      <li><Link href="/today" className="menu-link">Ежедневная игра</Link><p>Отгадывай 32 слова одновременно</p></li>
      <li><Link href="/how-to-play">Правила игры</Link></li>
    </ul>
  </>;
}
