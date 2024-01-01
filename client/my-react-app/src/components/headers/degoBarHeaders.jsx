/* eslint-disable react/prop-types */
import {NavLink} from 'react-router-dom';
import useDateParams from '../reuseFunction/dateParams';
export default function HouseRoutes ({component})
{
    const {currentYear, currentMonth, currentDay} = useDateParams();
    return (
        <nav className='my-5 bg-gray-800 p-4 rounded-lg w-auto block lg:flex justify-center items-center'>
            <div className='my-3 lg:my-0'>
                <NavLink 
                    className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-3 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5 py-2 px-3 hover:text-indigo-400 duration-300'} 
                    to = {`/rapportJournalier/${component}/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}
                    > Bralima </NavLink >
            </div>
            <div className='my-3 lg:my-0'>
                <NavLink 
                    className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-3 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5 py-2 px-3 hover:text-indigo-400 duration-300'} 
                    to = {`/rapportJournalier/${component}/product/brasimba?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}>Brasimba </NavLink >
            </div>
            <div className='my-3 lg:my-0'>
                <NavLink 
                    className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-3 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5 py-2 px-3 hover:text-indigo-400 duration-300'} 
                    to = {`/rapportJournalier/${component}/product/autreProduit?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Autre&nbsp;Produit </NavLink >
            </div>
            <div className='my-3 lg:my-0'>
                <NavLink 
                    className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-3 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5 py-2 px-3 hover:text-indigo-400 duration-300'} 
                    to = {`/rapportJournalier/${component}/product/liqueurs?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Liqueurs </NavLink >
            </div>
            <div className='my-3 lg:my-0'>
                <NavLink 
                    className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-3 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5 py-2 px-3 hover:text-indigo-400 duration-300'} 
                    to = {`/rapportJournalier/${component}/suiviDette?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}>  Suivi&nbsp;Dette </NavLink >
            </div>
            <dvi>
                <NavLink 
                    className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-3 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5 py-2 px-3 hover:text-indigo-400 duration-300'} 
                    to = {`/rapportJournalier/${component}/suiviDepense?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Suivi&nbsp;Depense </NavLink >
            </dvi>
            <div className='my-3 lg:my-0'>
                <NavLink 
                    className = {({isActive}) => isActive ? ' text-gray-50 border-b-4 border-indigo-500 rounded-lg px-3 py-2 mx-5 duration-300 hover:text-indigo-300 ' : 'text-gray-50 mx-5  py-2 px-3 hover:text-indigo-400 duration-300'} 
                    to = {`/rapportJournalier/${component}/dailyRepport?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Rapport&nbsp;Journalier </NavLink >
            </div>
        </nav>
    );
}