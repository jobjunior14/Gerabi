import {NavLink} from 'react-router-dom';
import React   from 'react';
import useDateParams from '../reuseFunction/dateParams';
export default function HouseRoutes ({component})
{
    const {currentYear, currentMonth, currentDay} = useDateParams();
    return (
        <nav className='my-5 bg-gray-800 p-4 rounded-lg w-auto'>
            <NavLink 
                className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-5 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5 py-2 px-5 hover:text-indigo-400 duration-300'} 
                to = {`/rapportJournalier/${component}/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}
                > Bralima </NavLink >
            <NavLink 
                className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-5 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5 py-2 px-5 hover:text-indigo-400 duration-300'} 
                to = {`/rapportJournalier/${component}/product/brasimba?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}>Brasimba </NavLink >
            <NavLink 
                className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-5 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5 py-2 px-5 hover:text-indigo-400 duration-300'} 
                to = {`/rapportJournalier/${component}/product/autreProduit?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Autre Produit </NavLink >
            <NavLink 
                className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-5 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5 py-2 px-5 hover:text-indigo-400 duration-300'} 
                to = {`/rapportJournalier/${component}/product/liqueurs?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Liqueurs </NavLink >
            <NavLink 
                className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-5 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5 py-2 px-5 hover:text-indigo-400 duration-300'} 
                to = {`/rapportJournalier/${component}/suiviDette?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}>  Suivi Dette </NavLink >
            <NavLink 
                className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-5 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5 py-2 px-5 hover:text-indigo-400 duration-300'} 
                to = {`/rapportJournalier/${component}/suiviDepense?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Suivi Depense </NavLink >
            <NavLink 
                className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-5 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5  py-2 px-5 hover:text-indigo-400 duration-300'} 
                to = {`/rapportJournalier/${component}/dailyRepport?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Rapport Journalier </NavLink >
</nav>
    );
};