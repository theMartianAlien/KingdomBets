import classes from './PlayersNavigation.module.css';
import { NavLink } from 'react-router-dom';

function PlayersNavigation() {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to="/players" className={({ isActive }) => isActive ? classes.active : undefined} end>All Players</NavLink>
                    </li>
                    <li>
                        <NavLink to="/players/new" className={({ isActive }) => isActive ? classes.active : undefined}>New Player</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default PlayersNavigation;
