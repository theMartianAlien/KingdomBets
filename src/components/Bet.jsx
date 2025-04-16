import classes from './Bet.module.css';
export default function Bet({ bet, players }) {
    return (
        <>
            <div className={classes.betTitle}>
                <p className={classes["team-versus"]}>
                    <span>{
                    players
                    .filter((p) => bet.players.teamA.includes(p.id))
                    .map((player) => { return player.name })}</span>
                    <span>&nbsp;VS&nbsp;</span>
                    <span>{
                    players
                    .filter((p) => bet.players.teamB.includes(p.id))
                    .map((player) => { return player.name })}</span>
                </p>
            </div>
            <div className='status'>
                <p>Bet status: <span>{bet.status}</span></p>
                {bet.status === 'completed' ?
                    (<p>Date Completed: <span>{bet.status}</span>
                        <span>{bet.winner}</span></p>) : undefined
                }
                <p>
                    {bet.status === 'completed' ? (<span>{bet.winner}</span>) : undefined}
                </p>
            </div>
            <div className={classes.team}>
                <div className="team team-a">
                    <ul className={classes.list}>
                        {players
                            .filter((p) => bet.players.teamA.includes(p.id))
                            .map(player => (<li key={player.id}>{player.name}</li>))}
                    </ul>
                </div>
                <div className="team team-b">
                    <ul className={classes.list}>
                        {players
                            .filter((p) => bet.players.teamB.includes(p.id))
                            .map(player => (<li key={player.id}>{player.name}</li>))}
                    </ul>
                </div>
            </div>
            <div className={classes.content}>
                {bet.text}
            </div>
            <div>
                <a href={bet.link}>BET LINK</a>
            </div>
        </>
    );
}