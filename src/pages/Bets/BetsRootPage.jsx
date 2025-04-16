import { Outlet } from "react-router-dom";
import BetsNavigation from "../../components/BetsNavigation";

export default function BetsRootPage() {
    return (
        <>
            <BetsNavigation/>
            <Outlet/>
        </>
    );
}