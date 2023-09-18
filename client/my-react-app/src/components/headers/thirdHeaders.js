import React from 'react';
import { NavLink} from 'react-router-dom';

export default function firstHeader ()
{
    return (
        <nav>
            <NavLink 
                className= { ({isActive}) => isActive ? "my-link" : null}
                to = '/mois'> Mois </NavLink>
            <NavLink 
                className= { ({isActive}) => isActive ? "my-link" : null}
                to = '/stats'> Statistiques </NavLink>
        </nav>
    )
}