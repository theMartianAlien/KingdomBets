import { Link, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import classes from './BetsList.module.css';
import images from '../util/IMAGES';

export default function BetsList() {
    const { bets } = useLoaderData();
    const data = useRouteLoaderData("bets-root");
    console.log(images["ongoing"]);
    return (
        <>
            <div className={classes.bets}>
                <h1>List of all current bets</h1>
                <ul className={classes.list}>
                    {bets.map((bet) => (
                        <li key={bet.betId} className={classes.item}>
                            <Link to={`/bets/${bet.betId}`} className={`${bet.status === 'complete' ? classes.complete : ''}`}>
                                <div className={classes["bet-container"]}>
                                    <img src={`${images[bet.status.trim().length > 0 ? bet.status : 'ongoing'].link}.jpg`} alt={bet.title} />
                                    <div className={classes.content}>
                                        <span>{bet.title}</span>
                                        <br />
                                        <div className={classes.leparticipants}>
                                            {(bet.players.teamA.map((player) => {
                                                const aPlayer = data.find((p) => p.id === player);
                                                return aPlayer.name
                                            })).join(",")}
                                            &nbsp;VS&nbsp;
                                            {(bet.players.teamB.map((player) => {
                                                const aPlayer = data.find((p) => p.id === player);
                                                return aPlayer.name
                                            })).join(",")}
                                        </div>
                                    </div>
                                    {bet.status.trim().length > 0 ? (
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
                                    ) : ''}
                                </div>
                            </Link>
                        </li>))}
                </ul>
            </div>
        </>
    );
}