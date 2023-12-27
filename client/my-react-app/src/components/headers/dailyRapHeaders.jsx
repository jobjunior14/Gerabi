import React from 'react';
import { NavLink, } from 'react-router-dom';

export default function DailyRepportHeaders ()
{
    return (
        <nav className=' bg-white text-center text-2xl p-5 my-2'>
            <NavLink 
                className={ ({isActive}) => isActive ? "my-link" : null}
                to = {`/rapportJournalier/degoBar?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Dego Bar </NavLink>
            <NavLink 
                className={ ({isActive}) => isActive ? "my-link" : null}
                to = {`/rapportJournalier/alimentation?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()}`}> Alimentation </NavLink>
        </nav>
    );
};