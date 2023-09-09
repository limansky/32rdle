import { Link, useLocation } from 'wouter';
import '~/styles/header.css';
import backUrl from '../../img/back.svg';
import clsx from 'clsx';
import { useState } from 'react';
import { SettingsDialog } from '../settings/SettingsDialog';

export function SimpleHeader({title}: {title: string}) {
  const [location] = useLocation();
  const [settingsShown, setSettingsShown] = useState(false);

  return <div className="header">
    <div className="row1">
      <Link to="/" ><img src={backUrl} className={clsx('back-link', { 'hidden' : location === "/"})}/></Link>
      <span className="simple-title">{title}</span>
      <button className='header-button' onClick={() => setSettingsShown(true)}>&#9881;</button>
      <SettingsDialog isOpen={settingsShown} onClose={() => setSettingsShown(false)} />
    </div>
  </div>;
}
