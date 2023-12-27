import React from 'react';
import { NavLink } from 'react-router-dom';

export default function FirstHeader ()
{
    return (
        <nav className='p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-100'>
            <NavLink 
                className={ ({isActive}) => isActive ? "my-link" : null}
                to = {`/?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> DEGO. </NavLink>
            <NavLink 
                className={ ({isActive}) => isActive ? "my-link" : null}
                to = {`/rapportMensuel?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Rapport Mensuel </NavLink>
            <NavLink 
                className={ ({isActive}) => isActive ? "my-link" : null}
                to = {`/rapportJournalier?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Rapport Journalier </NavLink>
            <nav>
                <NavLink 
                    className={ ({isActive}) => isActive ? "my-link" : null}
                    to = {`/..?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Docs </NavLink>
                <NavLink 
                    className={ ({isActive}) => isActive ? "my-link" : null}
                    to = {`/..?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Mode </NavLink>
            </nav>
        </nav>
    );
};