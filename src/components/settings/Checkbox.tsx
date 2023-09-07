import "~/styles/modal.css";

export function Checkbox({ title, subtitle }: { title: string, subtitle?: string }) {
  return <div className="setting">
    <input type="checkbox" id="dont-stop" className="checkbox" />
    <label htmlFor="dont-stop" className="label">
      <p className="setting-title">{title}</p>
      {subtitle && <p className="setting-subtitle">{subtitle}</p>}
    </label>
  </div>;
}
