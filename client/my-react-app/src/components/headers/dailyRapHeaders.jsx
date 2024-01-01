import { NavLink, } from 'react-router-dom';


export default function DailyRepportHeaders ()
{
    return (
        <nav className=' mt-10 text-center px-5 pb-5  w-full h-full block lg:flex justify-center items-center '>
            
            <div className='mx-5 my-4 lg:my-0'>

                <NavLink 
                    className={ ({isActive}) => isActive ? "text-gray-50 text-lg lg:text-xl bg-indigo-500 px-20 hover:text-indigo-400 rounded-lg py-2 duration-150  " : "text-gray-800 text-lg lg:text-xl px-20 py-2  hover:text-indigo-400"}
                    to = {`/rapportJournalier/degoBar?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Dego&nbsp;Bar </NavLink>
            </div>
            <div className='mx-5 my-4 lg:my-0'>
                <NavLink 
                    className={ ({isActive}) => isActive ? "text-gray-50 text-lg lg:text-xl bg-indigo-500 px-20 hover:text-indigo-400 rounded-lg py-2 duration-150 " : "text-gray-800 text-lg lg:text-xl px-20  py-2 hover:text-indigo-400"}
                    to = {`/rapportJournalier/alimentation?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()}`}> Alimentation </NavLink>
            </div>
        </nav>
    );
};