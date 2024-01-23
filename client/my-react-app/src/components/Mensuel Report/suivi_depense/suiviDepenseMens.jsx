/* eslint-disable react/prop-types */
import axios from '../../../axiosUrl';
import { useEffect, useState } from 'react';
import useParamsGetter from '../../reuseFunction/paramsGetter';
import useDateParams from '../../reuseFunction/dateParams';
import No_ExistentDate from "../../errorPages/no_existantDate";
import LoadingError from "../../errorPages/LoadingError";
import Loading from '../../loading';
import useTokenError from '../../errorPages/tokenError'
export default function MensRapSuiviDepense ({user, error, loading}) {

    //stateAction is here to know wich component is using the data based to current usrl using the Params data
    const {componentName} = useParamsGetter();

    //data from API
    const [data, setData] = useState (null);
    //dependacies of useEffect

    const {year, month, day, no_existent} = useDateParams();

    //render data
    const [displayEntreeCaisse, setDisplayEntreeCaisse] = useState(null);
    const [displaySortieCaisse, setDisplaySortieCaisse] = useState(null);

    //current user
    const currentUser = user === 'rappMens' ? true : false;

    const headers = {
        headers: {
            "content-type": "application/json", 'withCredentials': true,
            'authorization': `Bearer ${localStorage.getItem('jwtA')}`
        }
    };
    //fetch the data 
    useEffect(() => {
        
        const fecthData = async () => {
            try {
                setData(null);

                const apiData = currentUser ? await axios.get (`/${componentName}/suiviDepense/rapportMensuel/detail/${year}/${month}`, headers) :
                    await axios.get (`/${componentName}/suiviDepense/rapportJournalier/dailyRap/${year}/${month}/${day}`, headers); 
                
                setData(apiData.data.data);
            } catch (error) {
                
                console.log(error);
            }
        };fecthData();
    }, [year, month, componentName, currentUser]);
    
    //****************redirect to the login page if login error************* */
        useTokenError(error);
    /////////////////////*************/////////////////// */
    //map the list to display it //side effect
    useEffect(() => {

        if (data) {
            setDisplayEntreeCaisse(data.entreeCaisse.map (el => <tr className='[&>*:nth-child(even)]:bg-slate-200 border-2 [&>*:nth-child(even)]:dark:border-gray-50 ' key={`entreeCaisse${el._id}`}><td className="border-2 border-gray-800 px-10 dark:border-gray-50 dark:text-gray-50">{el._id}</td> <td className="border-2 border-gray-800 px-10">{el.valeur}</td></tr> ));
            setDisplaySortieCaisse( data.sortieCaisse.map (el => <tr className='[&>*:nth-child(even)]:bg-slate-200 border-2 [&>*:nth-child(even)]:dark:border-gray-50 ' key = {`sortieCaisse${el._id}`} ><td className="border-2 border-gray-800 px-10 dark:border-gray-50 dark:text-gray-50">{el._id}</td> <td className="border-2 border-gray-800 px-10">{el.valeur}</td></tr> ));
        }
    }, [data]);


    if (no_existent) {
        
        return (<div>
            <h1 className='dark:text-gray-50'>Ooouups vous ne pouvez demander une donnee d&apos;une date inexistante</h1>
        </div>
        )
    } else {

       if (data) {

        if (data.entreeCaisse.length > 0 && data.sortieCaisse.length > 0 ) {
        
            return (<div className=" justify-center flex">
                <h2 className="lg:text-3xl text-2xl font-bold text-gray-800 mb-7 absolute dark:text-gray-50 "> Suivi Depense</h2>
                <div className=" text-center items-center justify-center my-10 ">
                    <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900 dark:border-gray-50">
                        <thead>
                            <tr>
                                <th colSpan={2} className=" py-1 bg-indigo-200 px-12 border-solid font-normal border-2 border-gray-900 dark:border-gray-50">Entree Caisse</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayEntreeCaisse}
                        </tbody>
                        <thead>
                            <tr>
                                <th colSpan={2} className=" py-1 bg-indigo-200 px-12 border-solid font-normal border-2 border-gray-900 dark:border-gray-50">Sortie Caisse</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displaySortieCaisse}
                        </tbody>
                    </table>

                </div>
            </div>)
        } else {
            return (<No_ExistentDate/>);
        }
        } else {
            if (error) {
                return (<LoadingError message={error.message}/>);
            }

            if (loading) {
                return (<Loading/>)
            }
       }
    };
};

