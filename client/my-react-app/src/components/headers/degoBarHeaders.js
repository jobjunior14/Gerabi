import {NavLink} from 'react-router-dom';
import React   from 'react';

export default function DegoBarHeader ()
{
    return (
        <nav>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/degoBar/bralima?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Bralima </NavLink>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/degoBar/brasimba?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Brasimba </NavLink>
             <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/degoBar/autreProdut?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Autre Produit </NavLink>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/degoBar/liqueurs?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Liqueurs </NavLink>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/degoBar/suiviDette?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Suivi Dette </NavLink>
            <NavLink 
                className = {( {isActive}) => isActive ? 'my-link' : null }
                to = {`/rapportJournalier/degoBar/suiviDepense?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Suivi Depense </NavLink>
        </nav>
    );
};