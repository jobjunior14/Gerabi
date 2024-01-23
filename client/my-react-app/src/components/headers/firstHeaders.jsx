import { NavLink } from 'react-router-dom';
import useDateParams from '../reuseFunction/dateParams'
import { useState } from 'react';
import profil from '../../assets/profil.jpg';
export default function FirstHeader ()
{

    const [theme, setTheme] = useState ('dark');

    function toggleTheme () {


        if (theme === 'dark') {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        } else {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        }
    }

    const {currentYear, currentMonth, currentDay} = useDateParams();

    const [toggleBtn, setToggleBtn] = useState('hidden');

    function toggle () {
        if (window.innerWidth <= 1024) setToggleBtn(prev => prev === 'hidden' ? 'flex-col' : 'hidden');
    }

    const activeLink = `duration-300 my-9 lg:my-0   hover:text-indigo-300 block lg:flex font-bold dark:text-indigo-400 text-indigo-600 lg:mx-10`;
    return (
        <nav className={`justify-between  sticky w-full py-4 px-9 z-50 dark:bg-slate-950 bg-white rounded-xl shadow-lg flex items-center -top-1 duration-300`}>

            <div className=''>
                <NavLink 
                    className= { `dark:text-gray-200 text-gray-800 font-bold duration-200`}
                    to = {`/?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> DEGO. </NavLink>
            </div>

            <div className={`lg:flex lg:pl-9 duration-300 ${toggleBtn} ${toggleBtn === 'flex-col' ? ' fixed top-24 left-0 w-full h-full p-10 backdrop-blur-lg  items-center justify-center' : "" }`}>

                <div className='block lg:flex items-center lg:mr-40 justify-between'>
                    <NavLink 
                        onClick={toggle}
                        className={ ({isActive}) => isActive ? activeLink : `duration-300 dark:text-gray-100 text-gray-700 my-9 lg:my-0 block lg:flex hover:text-indigo-300 font-bold  lg:mx-10`}
                        to = {`/rapportMensuel?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Rapport Mensuel </NavLink>
                    <NavLink 
                        onClick={toggle}
                        className={ ({isActive}) => isActive ? activeLink : `duration-300 dark:text-gray-100 text-gray-700 my-9 lg:my-0 hover:text-indigo-300 block lg:flex font-bold lg:mx-10`}
                        to = {`/rapportJournalier?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Rapport Journalier </NavLink>
                </div>
                <div className=' bg-gray-700 px-1 py-2 block lg:flex justify-center items-center rounded-lg '>
                    <NavLink 
                        onClick={toggle}
                        className= 'mx-2 lg:flex hidden font-bold rounded-lg text-gray-100 '
                        to = {`/user?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}><img className='w-10 h-10 rounded-2xl' src={profil} alt='profil'/></NavLink>
                    <NavLink 
                        onClick={toggle}
                        className={ ({isActive}) => isActive ? "mx-2 text-center font-bold bg-indigo-600 rounded-lg px-3 py-1 duration-200 text-gray-100" : 'mx-2 text-center font-bold text-gray-100 px-4 py-1'}
                        to = {`/documentation?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}> Docs </NavLink>
                    <button 
                        className= 'mx-2 font-bold text-gray-100'
                        onClick={toggleTheme}> 
                        {theme === 'dark' ? 
                            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 text-center h-6 mt-px">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        }

                        
                        </button>
                </div>
            </div>
            <div className='flex lg:hidden justify-center items-center'>
                    <NavLink 

                        className= 'mx-5 font-bold rounded-lg text-gray-100 hover:scale-105 duration-150 '
                        to = {`/user?year=${currentYear}&month=${currentMonth}&day=${currentDay} `}><img className='w-10 h-10 rounded-2xl' src={profil} alt='profil'/></NavLink>
                    <i onClick={toggle} className="  scale-150 hover:bg-gray-100 rounded-xl px-2 duration-300 hover:cursor-pointer "> 
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`${theme === 'dark' ? 'text-white' : 'text-black' } w-5 h-5`}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                    </i>
            </div>
        </nav>
    );
};