import { Outlet } from "react-router-dom";
import FirstHeader from "./firstHeaders";
import ProductHeaders from "./productHeader";

export function MainNav () {

    return (
        <div>
            <FirstHeader/>
            <Outlet/>
        </div>
    )
}

export function ProductNav () {

    return (

        <div>
            <ProductHeaders/>
            <Outlet/>
        </div>
    )
}