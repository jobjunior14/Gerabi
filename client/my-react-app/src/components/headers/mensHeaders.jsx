import { NavLink,  } from 'react-router-dom';

export default function MensRepportHeaders ()
{
    return (
        <nav className='mt-10 text-center px-5 pb-5  w-full h-full block lg:flex justify-center items-center '>
            <div className='mx-5 my-4 lg:my-0'>
                <NavLink 
                    className={ ({isActive}) => isActive ? "text-gray-50 lg:text-xl text-lg bg-indigo-500 px-20 hover:text-gray-300 rounded-lg py-2 duration-150  " : "text-gray-800 lg:text-xl text-lg px-20  hover:text-indigo-400"}
                    to = {`/rapportMensuel/products/degoBar?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Dego&nbsp;Bar </NavLink>
            </div>
            <div className='mx-5 my-4 lg:my-0'>
                <NavLink 
                    className={ ({isActive}) => isActive ? "text-gray-50 lg:text-xl text-lg bg-indigo-500 px-20 hover:text-gray-300 rounded-lg py-2 duration-150  " : "text-gray-800 lg:text-xl text-lg px-20  hover:text-indigo-400"}
                    to = {`/rapportMensuel/products/alimentation?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()}`}> Alimentation </NavLink>
            </div>
            <div className='mx-5 my-4 lg:my-0'>
                <NavLink 
                    className={ ({isActive}) => isActive ? "text-gray-50 lg:text-xl text-lg bg-indigo-500 px-20 hover:text-gray-300 rounded-lg py-2 duration-150  " : "text-gray-800 lg:text-xl text-lg px-20  hover:text-indigo-400"}
                    to = {`/rapportMensuel/graphique?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()}`}> Graphique </NavLink>
            </div>
        </nav>
    );
};