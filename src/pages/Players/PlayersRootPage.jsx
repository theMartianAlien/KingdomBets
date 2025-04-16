import { Outlet } from "react-router-dom";
import PlayersNavigation from "../../components/PlayersNavigation";

export default function PlayersRootPage() {
    return (
        <>
            <PlayersNavigation/>
            <Outlet/>
        </>
    );
}