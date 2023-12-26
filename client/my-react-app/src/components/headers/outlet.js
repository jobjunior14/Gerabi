import { Outlet , useNavigate} from "react-router-dom";
import { useEffect } from "react";
import FirstHeader from "./firstHeaders";
import DailyRepportHeaders from "./dailyRapHeaders";
import MensRepportHeaders from "./mensHeaders";
import HouseRoutes from "./degoBarHeaders";
import useParamsGetter from "../reuseFunction/paramsGetter";
import useDateParams from "../reuseFunction/dateParams";
export function MainNav () {

    return (
        <div>
            <FirstHeader/>
            <Outlet/>
        </div>
    )
};

export function HouseNav () {

    //getting the params data of the current component
    const {componentName} = useParamsGetter();
    return (
        <div>
            <HouseRoutes component = {componentName}/>
            <Outlet/>
        </div>
    )
}

export function DailyRepportNav() {

    const {currentYear, currentMonth, currentDay} = useDateParams()
    const navigate = useNavigate();
    const {componentName} = useParamsGetter();

    useEffect (() => {
        navigate(`/rapportJournalier/${componentName}/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`)
    }, [componentName])
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