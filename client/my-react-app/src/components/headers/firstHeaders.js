import React from 'react';
import { NavLink } from 'react-router-dom';


export default function FirstHeader ()
{
    return (
        <nav>
            <NavLink 
                className={ ({isActive}) => isActive ? "my-link" : null}
                to = {`/rapportMensuel?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Rapport Mensuel </NavLink>
            <NavLink 
                className={ ({isActive}) => isActive ? "my-link" : null}
                to = '/rapportJournalier'> Rapport Journalier </NavLink>
        </nav>
    )
}