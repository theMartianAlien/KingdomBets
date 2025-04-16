import { useLoaderData } from 'react-router-dom';
import Players from '../components/Players'

export default function PlayersPage() {
    const data = useLoaderData();
    return (
        <>
            <h1>
                Players Page
            </h1>
            <p>List of Players</p>
            <div>
                <Players players={data} />
            </div>
        </>
    );
}

export async function loader() {
    const response = await fetch('http://localhost:3000/players');
    if (!response.ok) {

    } else {
        const resData = await response.json();
        return resData;
    }
}