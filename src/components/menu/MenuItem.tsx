import { ReactNode } from "react";
import { Link } from "wouter";
import "~/styles/menu.css";

export function MenuItem({children, link, subtitle}: { children: ReactNode, link: string, subtitle?: string}) {
  return <div className="menu-item">
    <Link href={link} className="menu-link">{children}</Link>
    <p className="menu-subtitle">{subtitle}</p>
  </div>
}
