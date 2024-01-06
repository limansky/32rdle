export function formatTime(millis: number): string {
  const rawSec = Math.round(millis / 1000)
  const s = Math.floor(rawSec % 60);
  const m = Math.floor(rawSec / 60 % 60);
  const h = Math.floor(rawSec / 3600);
  return (h != 0 ? [h, m, s] : [m, s]).map(n => n.toString().padStart(2, '0')).join(':');
}
