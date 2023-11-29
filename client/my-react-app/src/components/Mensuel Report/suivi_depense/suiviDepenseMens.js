import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function MensRapSuiviDepense (props) {

    //data from API
    const [data, setData] = useState (null);
    //dependacies of useEffect
    const year = useSelector(state => state.mensRapport.paramsDate.year);
    const month = useSelector (state => state.mensRapport.paramsDate.month);

    //current date
    const currentYear = Number (new Date().getFullYear());
    const currentMonth = Number (new Date().getMonth() + 1);

    //render data
    const [displayEntreeCaisse, setDisplayEntreeCaisse] = useState(null);
    const [displaySortieCaisse, setDisplaySortieCaisse] = useState(null);

    //fetch the data 
    useEffect(() => {
        
        const fecthData = async () => {
            try {
                setData(null);

                const apiData = await axios.get (`http://localhost:5001/api/v1/${props.componentName}/suiviDepense/rapportMensuel/detail/${year}/${month}`);
                setData(apiData.data.data);
            } catch (error) {
                console.log(error);
            };
        };fecthData();
    }, [year, month, props.componentName]);

    //map the list to display it //side effect
    useEffect(() => {

        if (data) {
            setDisplayEntreeCaisse(data.entreeCaisse.map (el => <tr><th>{el._id}</th> <td>{el.valeur}</td></tr> ));
            setDisplaySortieCaisse( data.sortieCaisse.map (el => <tr><th>{el._id}</th> <td>{el.valeur}</td></tr> ));
        };
    }, [data]);
     
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

