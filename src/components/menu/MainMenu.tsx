import { SimpleHeader } from "../header/SimpleHeader";
import "~/styles/menu.css";
import { MenuItem } from "./MenuItem";
import { ArchiveGameMenuItem } from "./ArchiveGameMenuItem";

export function MainMenu() {
  return <>
    <SimpleHeader title="32rdle" />
    <div className="main-menu">
      <MenuItem link="/today" subtitle="Отгадывай 32 слова одновременно">Ежедневная игра</MenuItem>
      <ArchiveGameMenuItem />
      <MenuItem link="/how-to-play">Правила игры</MenuItem>
    </div>
  </>;
}
