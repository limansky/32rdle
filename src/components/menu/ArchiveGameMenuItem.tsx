import { Link } from "wouter";
import { idForDate } from "../../utils/dictUtils";
import { useState } from "react";
import "~/styles/menu.css";

export function ArchiveGameMenuItem() {
  const todayId = idForDate(new Date());
  const [archId, setArchId] = useState(todayId);

  return <div className="menu-item">
    <div className="menu-item-row">
      <Link href={"/daily/" + archId} className="menu-link">Архивная игра #&nbsp;</Link>
      <input
        type="number"
        value={archId}
        onChange={e => setArchId(Number(e.target.value))}
        min={1}
        max={todayId}
        className="archive-id-input"
      />
    </div>
    <p className="menu-subtitle">Сыграть в одну из прошлых игр</p>
  </div>;
}
