import { Outlet , useNavigate} from "react-router-dom";
import { useEffect } from "react";
import FirstHeader from "./firstHeaders";
import DailyRepportHeaders from "./dailyRapHeaders";
import MensRepportHeaders from "./mensHeaders";

export function MainNav () {

    // const navigate = useNavigate();


    // useEffect (() => {
    //     navigate(`/rapportJournalier/degoBar/bralima?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()}`);
    // }, [navigate]);

    return (
        <div>
            <FirstHeader/>
            <Outlet/>
        </div>
    )
};

export function DailyRepportNav() {
    return (
        <div>
            <DailyRepportHeaders/>
            <Outlet/>
        </div>
    )
}

export function MensRepportNav () {

    return (
        <div>
            <MensRepportHeaders/>
            <Outlet/>
        </div>
    );
};