import React from 'react';
import axios from '../../../axiosUrl';
import { useEffect, useState } from 'react';
import useParamsGetter from '../../reuseFunction/paramsGetter';
import useDateParams from '../../reuseFunction/dateParams';
import searchImage from "../../../assets/searchImage.png"

export default function MensRapSuiviDepense ({user}) {

    //stateAction is here to know wich component is using the data based to current usrl using the Params data
    const {componentName} = useParamsGetter();

    //data from API
    const [data, setData] = useState (null);
    //dependacies of useEffect

    const {year, month, day, currentDay, currentMonth, currentYear, inexistentDate} = useDateParams();

    //render data
    const [displayEntreeCaisse, setDisplayEntreeCaisse] = useState(null);
    const [displaySortieCaisse, setDisplaySortieCaisse] = useState(null);

    //current user
    const currentUser = user === 'rappMens' ? true : false;

    //fetch the data 
    useEffect(() => {
        
        const fecthData = async () => {
            try {
                setData(null);

                const apiData = currentUser ? await axios.get (`/${componentName}/suiviDepense/rapportMensuel/detail/${year}/${month}`) :
                    await axios.get (`/${componentName}/suiviDepense/rapportJournalier/dailyRap/${year}/${month}/${day}`); 
                
                setData(apiData.data.data);
            } catch (error) {
                
                console.log(error);
            };
        };fecthData();
    }, [year, month, componentName, currentUser]);

    //map the list to display it //side effect
    useEffect(() => {

        if (data) {
            setDisplayEntreeCaisse(data.entreeCaisse.map (el => <tr className='[&>*:nth-child(even)]:bg-slate-200' key={`entreeCaisse${el._id}`}><td className="border-2 border-gray-800 px-10">{el._id}</td> <td className="border-2 border-gray-800 px-10">{el.valeur}</td></tr> ));
            setDisplaySortieCaisse( data.sortieCaisse.map (el => <tr className='[&>*:nth-child(even)]:bg-slate-200' key = {`sortieCaisse${el._id}`} ><td className="border-2 border-gray-800 px-10">{el._id}</td> <td className="border-2 border-gray-800 px-10">{el.valeur}</td></tr> ));
        };
    }, [data]);
     
    if (inexistentDate) {
        
        return (<div>
            <h1>Ooouups vous ne pouvez demander une donnee d'une date inexistante</h1>
        </div>
        )
    } else {

       if (data) {

        if (data.entreeCaisse.length > 0 && data.sortieCaisse.length > 0 ) {
        
            return (<div className=" justify-center flex">
                <h2 className="lg:text-3xl text-2xl font-bold text-gray-800 mb-5 absolute"> Suivi Depense</h2>
                <div className=" text-center items-center justify-center my-10 ">
                    <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900">
                        <thead>
                            <tr>
                                <th colSpan={2} className=" py-1 bg-indigo-200 px-12 border-solid font-normal border-2 border-gray-900">Entree Caisse</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayEntreeCaisse}
                        </tbody>
                        <thead>
                            <tr>
                                <th colSpan={2} className=" py-1 bg-indigo-200 px-12 border-solid font-normal border-2 border-gray-900">Sortie Caisse</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displaySortieCaisse}
                        </tbody>
                    </table>

                </div>
            </div>)
        } else {
            return (<div className="m-4">
                <h3 className="lg:text-2xl text-xl font-semibold text-gray-700"> VENTE BAR</h3>
                <div className=" flex items-center justify-center h-3/4 ">
                  <img className=" h-80 w-auto" src={searchImage} alt="search image" />
                </div>
                <h4 className="lg:text-3xl text-2xl text-gray-700 ">Ouuppss!! cette date n'a pas des donnees</h4>
            </div>);
        }
       } else {
            return (<div className=" justify-center flex">
                    <h3 className="lg:text-2xl text-xl font-semibold text-gray-700 block absolute"> VENTE BAR</h3>
                    <div className=" items-center justify-center my-40"> 
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 rounded-full animate-pulse dark:bg-indigo-400"></div>
                            <div className="w-5 h-5 rounded-full animate-pulse dark:bg-indigo-400"></div>
                            <div className="w-5 h-5 rounded-full animate-pulse dark:bg-indigo-400"></div>
                        </div>
                </div>
            </div>)
       }
    };
};

