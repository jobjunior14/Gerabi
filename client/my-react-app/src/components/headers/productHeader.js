import {NavLink} from 'react-router-dom';
import React   from 'react';

export default function ProductHeaders ()
{
    return (
        <nav>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/stockConsignation/bralima?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Bralima </NavLink>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/stockConsignation/brasimba?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Brasimba </NavLink>
             <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/stockConsignation/autreProdut?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Autre Produit </NavLink>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/stockConsignation/liqueurs?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Liqueurs </NavLink>
        </nav>
    )
}