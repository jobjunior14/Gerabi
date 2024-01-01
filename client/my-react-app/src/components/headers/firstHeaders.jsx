import { NavLink } from 'react-router-dom';
import useDateParams from '../reuseFunction/dateParams'
import { useState } from 'react';
export default function FirstHeader ()
{
    const {currentYear, currentMonth, currentDay} = useDateParams();

    const [toggleBtn, setToggleBtn] = useState('hidden');

    function toggle () {
        setToggleBtn(prev => prev === 'hidden' ? 'flex-col' : 'hidden');
    }

    return (
        <nav className='justify-between  sticky w-full py-4 px-9 z-50 bg-white rounded-xl shadow-lg flex items-center -top-1 duration-300'>

            <div className=''>
                <NavLink 
                    className={ ({isActive}) => isActive ? "text-indigo-600 font-bold" : 'text-gray-800 font-bold'}
                    to = {`/?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> DEGO. </NavLink>
            </div>

            <div className={`lg:flex lg:pl-9 duration-300 ${toggleBtn} ${toggleBtn === 'flex-col' ? ' fixed top-24 left-0 w-full h-full p-5 backdrop-blur-lg  items-center justify-center' : "" }`}>

                <div className='block lg:flex items-center lg:mr-40 justify-between'>
                    <NavLink 
                        className={ ({isActive}) => isActive ? "duration-300 hover:text-indigo-300 block lg:flex font-bold text-indigo-600 lg:mx-10" : 'duration-300 block lg:flex hover:text-indigo-300 font-bold text-gray-800 lg:mx-10'}
                        to = {`/rapportMensuel?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Rapport Mensuel </NavLink>
                    <NavLink 
                        className={ ({isActive}) => isActive ? "duration-300 hover:text-indigo-300 block lg:flex font-bold text-indigo-600 lg:mx-10" : 'duration-300 hover:text-indigo-300 block lg:flex font-bold text-gray-800 lg:mx-10'}
                        to = {`/rapportJournalier?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Rapport Journalier </NavLink>
                </div>
                <div className=' bg-gray-700 px-3 py-2 block lg:flex justify-center items-center rounded-lg '>
                    <NavLink 
                        className={ ({isActive}) => isActive ? "mx-5 font-bold bg-indigo-600 rounded-lg px-4 py-1 duration-200 text-gray-100" : 'mx-5 font-bold text-gray-100 px-4 py-1'}
                        to = {`/documentation?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Docs </NavLink>
                    <button 
                        className= 'mx-5 font-bold text-gray-100'
                        to = {`/..?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Mode </button>
                </div>
            </div>
            <div className='flex lg:hidden'>
                    <i onClick={toggle} className="uil uil-bars  scale-150 hover:bg-gray-100 rounded-xl px-2 duration-300 hover:cursor-pointer "></i>
            </div>
        </nav>
    );
};