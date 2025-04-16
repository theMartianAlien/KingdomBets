import { redirect, useLoaderData } from "react-router-dom";
import NewBet from "../../components/NewBet";

export default function NewBetPage() {
    const data = useLoaderData();
    const bet = {
        betId: "",
        players:
        {
            teamA: [],
            teamB: []
        },
        status: "",
        winner: "",
        link: "",
        text: ""
    }
    return (
        <>
            <NewBet players={data} bet={bet} />
        </>
    );
}

export async function action({ request, params }) {

    const data = await request.formData();
    const title = data.get('title');
    const teamA = data.getAll('teamA');
    const teamB = data.getAll('teamB');
    const status = data.get('bet-status') ?? 'ongoing';
    const winner = data.get('title');
    const link = data.get('link');
    const text = data.get('text');
    const betData = {
        title,
        players: {
            teamA,
            teamB
        },
        dateCompleted: "",
        status,
        winner,
        link,
        text
    }

    const response = await fetch('http://localhost:3000/bets/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(betData)
    });

    if (!response.ok) {

    }

    const resData = await response.json();
    console.log(resData);
    return redirect('/bets');
}