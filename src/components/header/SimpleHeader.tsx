import { Link, useLocation } from 'wouter';
import '~/styles/header.css';
import backUrl from '../../img/back.svg';
import clsx from 'clsx';

export function SimpleHeader() {
  const [location] = useLocation();

  return <div className="header">
    <div className="row1">
      <Link to="/" ><img src={backUrl} className={clsx({ 'hidden' : location === "/"})}/></Link>
      <span className="header-title">32rdle</span>
    </div>
  </div>;
}
