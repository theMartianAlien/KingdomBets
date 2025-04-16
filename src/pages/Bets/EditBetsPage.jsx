import { useRouteLoaderData } from "react-router-dom";
import NewBet from "../../components/NewBet";

export default function EditBetsPage() {
    const data = useRouteLoaderData("bet-detail");
    return (
        <>
            <NewBet bet={data.bet} players={data.players}/>
        </>
    );
}