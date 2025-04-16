import classes from './BetsNavigation.module.css';
import { NavLink } from 'react-router-dom';

function BetsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/bets" className={({ isActive }) => isActive ? classes.active : undefined} end>All Bets</NavLink>
          </li>
          <li>
            <NavLink to="/bets/new" className={({ isActive }) => isActive ? classes.active : undefined}>New Bet</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default BetsNavigation;
