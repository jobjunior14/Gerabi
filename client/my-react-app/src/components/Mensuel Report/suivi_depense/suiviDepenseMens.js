import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function MensRapSuiviDepense () {

    //data from API
    const [data, setData] = useState (null);
    //componentName
    const componentName = useSelector (state => state.mensRapport.componentName);
    //dependacies of useEffect
    const year = useSelector(state => state.mensRapport.paramsDate.year);
    const month = useSelector (state => state.mensRapport.paramsDate.month);

    //current date
    const currentYear = Number (new Date().getFullYear());
    const currentMonth = Number (new Date().getMonth() + 1);

    //fetch the data 
    useEffect(() => {
        
        const fecthData = async () => {
            try {
                setData(null);

                const apiData = await axios.get (`http://localhost:5001/api/v1/${componentName}/suiviDepense/rapportMensuel/detail/${year}/${month}`);
                setData(apiData.data.data);
            } catch (error) {
                console.log(error);
            };
        };fecthData();
    }, [year, month]);

    let displayEntreeCaisse = [];
    let displaySortieCaisse = [];
    //map the list to display it
    if (data) {
        displayEntreeCaisse = data.entreeCaisse.map (el => <tr> <th>{el._id}</th> <td>{el.valeur}</td></tr> );
        displaySortieCaisse = data.sortieCaisse.map (el => <tr> <th>{el._id}</th> <td>{el.valeur}</td></tr> );
    };
     
    if (year > currentYear || month > currentMonth) {
        
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
    }

    
};

