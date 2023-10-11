import {NavLink} from 'react-router-dom';
import React   from 'react';

export default function ProductHeaders ()
{
    return (
        <nav>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/bralima?year=${new Date().toLocaleDateString().slice(6)}&month=${new Date().toLocaleDateString().slice(3, 5)}&day=${new Date().toLocaleDateString().slice(0, 2)} `}> Bralima </NavLink>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/brasimba?year=${new Date().toLocaleDateString().slice(6)}&month=${new Date().toLocaleDateString().slice(3, 5)}&day=${new Date().toLocaleDateString().slice(0, 2)} `}> Brasimba </NavLink>
             <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/autreProdut?year=${new Date().toLocaleDateString().slice(6)}&month=${new Date().toLocaleDateString().slice(3, 5)}&day=${new Date().toLocaleDateString().slice(0, 2)} `}> Autre Produit </NavLink>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/liqueurs?year=${new Date().toLocaleDateString().slice(6)}&month=${new Date().toLocaleDateString().slice(3, 5)}&day=${new Date().toLocaleDateString().slice(0, 2)} `}> Liqueurs </NavLink>
        </nav>
    )
}