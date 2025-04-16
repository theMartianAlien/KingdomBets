import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation";
import classes from './RootPage.module.css';

export default function RootPage() {
    return (
        <>
            <MainNavigation />
            <main className={classes.content}>
                <Outlet />
            </main>
        </>
    );
}