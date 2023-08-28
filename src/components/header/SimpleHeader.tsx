import { Link, useLocation } from 'wouter';
import '~/styles/header.css';
import backUrl from '../../img/back.svg';
import clsx from 'clsx';

export function SimpleHeader({title}: {title: string}) {
  const [location] = useLocation();

  return <div className="header">
    <div className="row1">
      <Link to="/" ><img src={backUrl} className={clsx('back-link', { 'hidden' : location === "/"})}/></Link>
      <span className="simple-title">{title}</span>
    </div>
  </div>;
}
