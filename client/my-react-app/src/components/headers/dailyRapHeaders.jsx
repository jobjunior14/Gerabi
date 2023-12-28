import { NavLink, } from 'react-router-dom';


export default function DailyRepportHeaders ()
{
    return (
        <nav className=' text-center text-2xl p-5 my-2 w-full h-full '>
            
            <NavLink 
                className={ ({isActive}) => isActive ? "text-gray-50 text-xl bg-indigo-500 px-20 hover:text-indigo-400 rounded-lg py-2 duration-150  " : "text-gray-800 text-xl px-20  hover:text-indigo-400"}
                to = {`/rapportJournalier/degoBar?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Dego Bar </NavLink>
            <NavLink 
                className={ ({isActive}) => isActive ? "text-gray-50 text-xl bg-indigo-500 px-20 hover:text-indigo-400 rounded-lg py-2 duration-150 " : "text-gray-800 text-xl px-20  hover:text-indigo-400"}
                to = {`/rapportJournalier/alimentation?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()}`}> Alimentation </NavLink>
        </nav>
    );
};