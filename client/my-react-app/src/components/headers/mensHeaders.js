import React from 'react';
import { NavLink,  } from 'react-router-dom';

export default function MensRepportHeaders ()
{
    return (
        <nav>
            <NavLink 
                className={ ({isActive}) => isActive ? "my-link" : null}
                to = {`/rapportMensuel/degoBar?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Dego Bar </NavLink>
            <NavLink 
                className={ ({isActive}) => isActive ? "my-link" : null}
                to = {`/rapportMensuel/alimentation?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()}`}> Alimentation </NavLink>
            <NavLink 
                className={ ({isActive}) => isActive ? "my-link" : null}
                to = {`/rapportMensuel/Graphique?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()}`}> Graphique </NavLink>
        </nav>
    );
};