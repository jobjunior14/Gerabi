import { Outlet , useNavigate} from "react-router-dom";
import { useEffect } from "react";
import FirstHeader from "./firstHeaders";
import DailyRepportHeaders from "./dailyRapHeaders";
import MensRepportHeaders from "./mensHeaders";

export function MainNav () {

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