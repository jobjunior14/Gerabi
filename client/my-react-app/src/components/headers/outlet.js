import { Outlet } from "react-router-dom";
import FirstHeader from "./firstHeaders";
import ProductHeaders from "./productHeader";
import MainDailyRepport from "./mainDailyreportHeaders";

export function MainNav () {

    return (
        <div>
            <FirstHeader/>
            <Outlet/>
        </div>
    )
};

export function DailyRepportNav () {

    return (
        <div>
            <MainDailyRepport/>
            <Outlet/>
        </div>
    );
};

export function ProductNav () {

    return (

        <div>
            <ProductHeaders/>
            <Outlet/>
        </div>
    )
}