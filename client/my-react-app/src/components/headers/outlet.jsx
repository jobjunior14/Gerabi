import { Outlet , useNavigate, useMatch, useLocation} from "react-router-dom";
import { useEffect } from "react";
import FirstHeader from "./firstHeaders";
import DailyRepportHeaders from "./dailyRapHeaders";
import MensRepportHeaders from "./mensHeaders";
import HouseRoutes from "./degoBarHeaders";
import useParamsGetter from "../reuseFunction/paramsGetter";
import useDateParams from "../reuseFunction/dateParams";
export function MainNav () {

    const navigate = useNavigate();
    const match = useMatch('/');

    const {currentDay, currentYear, currentMonth} = useDateParams();
    //the firt use of navigate must be in a useEffect hook
    useEffect(() => {
        if (match) navigate(`/rapportJournalier/degoBar/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
    }, [match]);

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
    const navigate = useNavigate();
    const match1 = useMatch('/rapportJournalier/degoBar');
    const match2 = useMatch('/rapportJournalier/alimentation');
    const {currentDay, currentYear, currentMonth} = useDateParams();

    useEffect(() => {
        
        if (match1) navigate(`/rapportJournalier/degoBar/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
        if (match2) navigate(`/rapportJournalier/alimentation/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);

    }, [match1, match2]);
    return (
        <div>
            <HouseRoutes component = {componentName}/>
            <Outlet/>
        </div>
    )
};

export function DailyRepportNav() {

    const navigate = useNavigate();
    const match = useMatch('/rapportJournalier');
    const {currentDay, currentYear, currentMonth} = useDateParams();

    useEffect(() => {
        if (match) navigate(`/rapportJournalier/degoBar/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
    }, [match]);
   
    return (
        <div>
            <DailyRepportHeaders/>
            <Outlet/>
        </div>
    )
};

export function MensRepportNav () {

    const navigate = useNavigate();
    const match = useMatch('/rapportMensuel');
    const {currentDay, currentYear, currentMonth} = useDateParams();

    useEffect(() => {

        if (match) navigate(`/rapportMensuel/products/degoBar?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
    }, [match]);
    return (
        <div>
            <MensRepportHeaders/>
            <Outlet/>
        </div>
    );
};