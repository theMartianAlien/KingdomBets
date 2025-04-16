import { Link, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import classes from './BetsList.module.css';

export default function BetsList() {
    const { bets } = useLoaderData();
    const data = useRouteLoaderData("bets-root");
 
    return (
        <>
            <div className={classes.bets}>
                <h1>List of all current bets</h1>
                <ul className={classes.list}>
                    {bets.map((bet) => (
                        <li key={bet.betId} className={classes.item}>
                            <Link to={`/bets/${bet.betId}`} className={`${bet.status === 'complete' ? classes.complete : ''}`}>
                                <img src={bet.image} alt={event.title} />
                                <div className={classes.content}>
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
                                </div>
                                <div>
                                    <p>
                                        Status: <span className={classes.status}>{bet.status}</span>
                                    </p>
                                    {
                                        bet.winner.trim().length > 0 ? (
                                            <p>
                                                Winner Team: {
                                                    bet.winner === "teamA" ? 
                                                    bet.players.teamA.map((player) => {
                                                        const aPlayer = data.find((p) => p.id === player);
                                                        return aPlayer.name
                                                    })
                                                    : 
                                                    bet.players.teamB.map((player) => {
                                                        const aPlayer = data.find((p) => p.id === player);
                                                        return aPlayer.name
                                                    })
                                                }
                                            </p>
                                        ) : ''
                                    }
                                </div>
                            </Link>
                        </li>))}
                </ul>
            </div>
        </>
    );
}