import { Link, useRouteLoaderData } from "react-router-dom";
import classes from './BetDetailPage.module.css';
import Bet from "../../components/Bet";

export default function BetsDetailPage() {
    const data = useRouteLoaderData("bet-detail");

    return (
        <div className={classes.thebet}>
            <Bet bet={data.bet} players={data.players} />
            <div>
                <Link to={`edit`} relative='path'>Edit Bet</Link>
                <Link to=".." relative='path'>Back</Link>
            </div>
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