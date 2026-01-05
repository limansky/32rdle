import { ChangeEvent } from "react";

export function WidthSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange(Number(e.target.value));
  }

  return (
    <div className="setting">
      <label htmlFor="bpr" className="label">
        <p className="setting-title">Досок в строке</p>
      </label>
      <select id="bpr" value={value} onChange={handleChange}>
        <option>4</option>
        <option>8</option>
        <option>16</option>
      </select>
    </div>
  );
}
