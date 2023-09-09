import { ChangeEvent } from "react";
import "~/styles/modal.css";

export function Checkbox({ title, subtitle, value, onChange }: {
  title: string,
  subtitle?: string,
  value: boolean,
  onChange: (value: boolean) => void
}) {

  function onCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked);
  }

  return <div className="setting">
    <input type="checkbox" id="dont-stop" className="checkbox" checked={value} onChange={onCheckboxChange} />
    <label htmlFor="dont-stop" className="label">
      <p className="setting-title">{title}</p>
      {subtitle && <p className="setting-subtitle">{subtitle}</p>}
    </label>
  </div>;
}
