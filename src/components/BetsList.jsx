import { Link, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import classes from './BetsList.module.css';

export default function BetsList() {
    const { bets } = useLoaderData();
    const data = useRouteLoaderData("bets-root");

    return (
        <>
            <h2>List of current bets</h2>
            <div className='bets'>
                <ul className={classes.list}>
                    {bets.map((bet) => (<li key={bet.betId}>
                        <p>
                            <Link to={`/bets/${bet.betId}`} >
                                <span>{bet.title}</span>
                                <br />
                                {bet.players.teamA.map((player) => {
                                    const aPlayer = data.find((p) => p.id === player);
                                    return aPlayer.name
                                })}
                                &nbsp;VS&nbsp;
                                {bet.players.teamB.map((player) => {
                                    const aPlayer = data.find((p) => p.id === player);
                                    return aPlayer.name
                                })}
                                <br />
                                Status:
                                <span className={classes.status}> {bet.status.trim().length === 0 ? 'On going' : ''}</span>
                                {bet.status.trim().length > 1 ? (<span className={classes.winner}>Winner: {bet.winner}</span>) : ''}
                            </Link>
                        </p>
                    </li>))}
                </ul>
            </div>
        </>
    );
}