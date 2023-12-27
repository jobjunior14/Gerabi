import { Outlet , useNavigate, useMatch} from "react-router-dom";
import { useEffect, useState } from "react";
import FirstHeader from "./firstHeaders";
import DailyRepportHeaders from "./dailyRapHeaders";
import MensRepportHeaders from "./mensHeaders";
import HouseRoutes from "./degoBarHeaders";
import useParamsGetter from "../reuseFunction/paramsGetter";
import useDateParams from "../reuseFunction/dateParams";
export function MainNav () {

    const navigate = useNavigate();
    const match = useMatch('/');
    const [count, setCount] = useState(0);
    const {currentDay, currentYear, currentMonth} = useDateParams()
    useEffect(() => {
        
        if (match) {
            if (count === 0) {
                setCount(1);
                navigate(`/rapportJournalier/degoBar/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
            } else {
                navigate(`/rapportJournalier/degoBar/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
            }
        }
    });

    return (
        <div>
            <FirstHeader/>
            <Outlet/>
        </div>
    )
};

export function HouseNav () {

    const navigate = useNavigate();
    const match1 = useMatch('/rapportJournalier/degoBar');
    const match2 = useMatch('/rapportJournalier/alimentation');
    const [count, setCount] = useState(0);
    const {currentDay, currentYear, currentMonth} = useDateParams();

    useEffect(() => {
        
        if (match1) {
            if (count === 0) {
                setCount(1);
                navigate(`/rapportJournalier/degoBar/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
            } else {
                navigate(`/rapportJournalier/degoBar/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
            }
        };
        if (match2) {
            if (count === 0) {
                setCount(1);
                navigate(`/rapportJournalier/alimentation/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
            } else {
                navigate(`/rapportJournalier/alimentation/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
            }
        };
    });
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

    const navigate = useNavigate();
    const match = useMatch('/rapportJournalier');
    const [count, setCount] = useState(0);
    const {currentDay, currentYear, currentMonth} = useDateParams();

    useEffect(() => {
        
        if (match) {
            if (count === 0) {
                setCount(1);
                navigate(`/rapportJournalier/degoBar/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
            } else {
                navigate(`/rapportJournalier/degoBar/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
            }
        };
    });
   
    return (
        <div>
            <DailyRepportHeaders/>
            <Outlet/>
        </div>
    )
}

export function MensRepportNav () {

    const navigate = useNavigate();
    const match = useMatch('/rapportMensuel');
    const [count, setCount] = useState(0);
    const {currentDay, currentYear, currentMonth} = useDateParams();

    useEffect(() => {
        

        if (match) {
            if (count === 0) {
                setCount(1);
                navigate(`/rapportMensuel/products/degoBar?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
            } else {
                navigate(`/rapportMensuel/products/degoBar?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
            }
        };
    });
    return (
        <div>
            <MensRepportHeaders/>
            <Outlet/>
        </div>
    );
};