import {NavLink} from 'react-router-dom';
import React   from 'react';
import useDateParams from '../reuseFunction/dateParams';
export default function HouseRoutes ({component})
{
    const {currentYear, currentMonth, currentDay} = useDateParams()
    return (
        <nav>
            <NavLink className = {({isActive}) => isActive ? 'my-link' : null} to = {`/rapportJournalier/${component}/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Bralima </NavLink >
            <NavLink className = {({isActive}) => isActive ? 'my-link' : null} to = {`/rapportJournalier/${component}/product/brasimba?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}>Brasimba </NavLink >
            <NavLink className = {({isActive}) => isActive ? 'my-link' : null} to = {`/rapportJournalier/${component}/product/autreProduit?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Autre Produit </NavLink >
            <NavLink className = {({isActive}) => isActive ? 'my-link' : null} to = {`/rapportJournalier/${component}/product/liqueurs?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Liqueurs </NavLink >
            <NavLink className = {({isActive}) => isActive ? 'my-link' : null} to = {`/rapportJournalier/${component}/suiviDette?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}>  Suivi Dette </NavLink >
            <NavLink className = {({isActive}) => isActive ? 'my-link' : null} to = {`/rapportJournalier/${component}/suiviDepense?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Suivi Depense </NavLink >
            <NavLink className = {({isActive}) => isActive ? 'my-link' : null} to = {`/rapportJournalier/${component}/dailyRepport?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Rapport Journalier </NavLink >
        </nav>
    );
};