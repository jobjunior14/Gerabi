import {NavLink} from 'react-router-dom';
import React   from 'react';

export default function ProductHeaders ()
{
    return (
        <nav>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = '/rapportJournalier/bralima'> Bralima </NavLink>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = '/rapportJournalier/brasimba'> Brasimba </NavLink>
             <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = '/rapportJournalier/autreProdut'> Autre Produit </NavLink>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = '/rapportJournalier/liqueurs'> Liqueurs </NavLink>
        </nav>
    )
}