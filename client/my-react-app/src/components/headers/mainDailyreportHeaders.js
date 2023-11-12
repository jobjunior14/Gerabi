import { NavLink } from "react-router-dom";
import React from "react";

export default function MainDailyRepport () {

    return (
        <nav>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/suiviDette?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Suivi Dette </NavLink>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/suiviDepense?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Suivi Depense </NavLink>
             <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/stockConsignation?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Stock Consignation </NavLink>
        </nav>
    );
}