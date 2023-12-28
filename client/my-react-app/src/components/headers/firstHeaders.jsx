import { NavLink } from 'react-router-dom';
import useDateParams from '../reuseFunction/dateParams'
export default function FirstHeader ()
{
    const {currentYear, currentMonth, currentDay} = useDateParams();
    return (
        <nav className='p-6 max-w-full mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-100 w-screen'>
            <NavLink 
                className={ ({isActive}) => isActive ? "px-10 mx-10 text-indigo-500 hover:text-indigo-400 font-bold" : 'px-10 mx-10 text-gray-800 font-bold hover:text-indigo-400'}
                to = {`/?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> DEGO. </NavLink>
            <NavLink 
                className={ ({isActive}) => isActive ? "px-10 mx-10 text-indigo-500 hover:text-indigo-400 font-bold" : 'px-10 mx-10 text-gray-800 font-bold hover:text-indigo-400'}
                to = {`/rapportMensuel?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Rapport Mensuel </NavLink>
            <NavLink 
                className={ ({isActive}) => isActive ? "px-10 mx-10 text-indigo-500 hover:text-indigo-400 font-bold" : 'px-10 mx-10 text-gray-800 font-bold hover:text-indigo-400'}
                to = {`/rapportJournalier?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Rapport Journalier </NavLink>
            <nav className='px-10 mx-10 flex rounded-lg bg-gray-800 py-4'>
                <NavLink 
                    className={ ({isActive}) => isActive ? "px-5 py-1 text-gray-50 bg-indigo-500 rounded-lg font-bold duration-500 " : ' text-gray-100 font-bold px-5 py-1 hover:text-indigo-400 '}
                    to = {`/documentation?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Docs </NavLink>
                <button 
                    className= 'text-gray-100 px-3 mx-5 font-bold'
                    to = {`/..?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Mode </button>
            </nav>
        </nav>
    );
};