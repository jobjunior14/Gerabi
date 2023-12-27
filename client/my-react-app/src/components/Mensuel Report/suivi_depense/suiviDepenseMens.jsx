import React from 'react';
import axios from '../../../axiosUrl';
import { useEffect, useState } from 'react';
import useParamsGetter from '../../reuseFunction/paramsGetter';
import useDateParams from '../../reuseFunction/dateParams';

export default function MensRapSuiviDepense ({user}) {

    //stateAction is here to know wich component is using the data based to current usrl using the Params data
    const {componentName} = useParamsGetter();

    //data from API
    const [data, setData] = useState (null);
    //dependacies of useEffect

    const {year, month, day, currentDay, currentMonth, currentYear} = useDateParams();

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
            setDisplayEntreeCaisse(data.entreeCaisse.map (el => <tr key={`entreeCaisse${el._id}`}><th>{el._id}</th> <td>{el.valeur}</td></tr> ));
            setDisplaySortieCaisse( data.sortieCaisse.map (el => <tr key = {`sortieCaisse${el._id}`} ><th>{el._id}</th> <td>{el.valeur}</td></tr> ));
        };
    }, [data]);
     
    if (year > currentYear || month > currentMonth || day > currentDay) {
        
        return (<div>
            <h1>Ooouups vous ne pouvez demander une donnee d'une date inexistante</h1>
        </div>
        )
    } else {

       if (data) {

        if (data.entreeCaisse.length > 0 && data.sortieCaisse.length > 0 ) {
        
            return (<div>
                <h2> Suivi Depense</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Entree Caisse</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayEntreeCaisse}
                    </tbody>
                    <thead>
                        <tr>
                            <th>Sortie Caisse</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displaySortieCaisse}
                    </tbody>
                </table>
            </div>)
        } else {
            return (<div>
                <h2>Suivi Depense</h2>
                <h4>Ouuppss!!!! cette date n'a pas des donnees</h4>
            </div>);
        }
       } else {
        return (<div>
            <h2> Suivi Depense </h2>
            <h4> Chargement.....</h4>
        </div>)
       }
    };
};

