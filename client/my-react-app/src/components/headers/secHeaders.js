import {NavLink} from 'react-router-dom';
import React   from 'react';

export default function secHeader ()
{
    return (
        <nav>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = '/data'> Données </NavLink>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = '/stats'> Statistiques </NavLink>
        </nav>
    )
}