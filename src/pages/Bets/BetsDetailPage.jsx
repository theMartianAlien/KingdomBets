import { Link, useRouteLoaderData } from "react-router-dom";
import Bet from "../../components/Bet";

export default function BetsDetailPage() {
    const data = useRouteLoaderData("bet-detail");

    return (
        <div>
            <Bet bet={data.bet} players={data.players} />
            <Link to={`edit`} relative='path'>Edit Bet</Link>
            <br />
            <Link to=".." relative='path'>Back</Link>
        </div>
    );
}

export async function loader({ request, params }) {
    const id = params.betId;

    const response = await fetch('http://localhost:3000/bets/' + id);
    if (!response.ok) {

    } else {
        const resData = await response.json();
        return resData;
    }
}