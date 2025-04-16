export default function Players({ players }) {
    return (
        <>
            <ul>
                {players.map((player, index) => (<li key={player.id}>{player.name} - {index}</li>))}
            </ul>
        </>
    );
}