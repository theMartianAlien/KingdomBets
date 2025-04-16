import BetsList from '../../components/BetsList';

export default function BetsPage() {

    return (
        <>
            <BetsList />
        </>
    );
}

export async function loader() {
    const response = await fetch('http://localhost:3000/bets');
    if (!response.ok) {

    } else {
        const resData = await response.json();
        return resData;
    }
}