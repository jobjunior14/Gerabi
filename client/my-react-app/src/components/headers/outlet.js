import { Outlet , useNavigate} from "react-router-dom";
import { useEffect } from "react";
import FirstHeader from "./firstHeaders";
import AlimentationHeader from "./alimentationHeaders";
import DegoBarHeader from "./degoBarHeaders";
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

export function AlimNav () {

    // const navigate = useNavigate ();

    // useEffect (() => {
    //     navigate('alimentation/bralima');
    // }, [navigate]);

    return (

        <div>
            <AlimentationHeader/>
            <Outlet/>
        </div>
    );
};

export function DegoBarNav () {

    const navigate = useNavigate ();

    // useEffect (() => {
    //     navigate('/bralima');
    // }, [navigate]);

    return (

        <div>
            <DegoBarHeader/>
            <Outlet/>
        </div>
    );
};

export function MensRepportNav () {

    return (
        <div>
            <MensRepportHeaders/>
            <Outlet/>
        </div>
    );
};