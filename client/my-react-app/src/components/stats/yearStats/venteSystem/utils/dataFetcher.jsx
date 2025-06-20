import { useState, useEffect } from "react";
import useDateParams from "../../../../reuseFunction/dateParams";
import axios from '../../../../../axiosUrl';
import { dateSetter } from "./yearsStatsArrayUtils";
import useTokenError from '../../../../errorPages/tokenError'
export default function useDataFetcherYearStats ({componentName, productName}) {

   
    const [data, setData] = useState(null);
    const [venteBar, setVenteBar] = useState([]);
    const [approvisionnement, setApprovisionnement] = useState([]);
    const [benefice, setBenefice] = useState([]);
    const [month, setMonth]= useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    //date params
    const {year} = useDateParams();

    const headers = {
        headers: {
            "content-type": "application/json", 'withCredentials': true,
            'authorization': `Bearer ${localStorage.getItem('jwtA')}`
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const apiData = await axios.get (`/${componentName}/${productName}/rapportMensuel/yearStats/${year}`, headers);
            setData(apiData.data.stats.stats);

        } catch (e) {
            setError(e);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

    if (data) {
        if (data.length > 0) {
            const saveVenteBar = [];
            const saveAppro = [];
            const saveBenef = [];
            for (let i of data) {
                saveVenteBar.push(i.vente_bar);
                saveAppro.push(i.approvisionnement);
                saveBenef.push(i.benefice);
            }
            setVenteBar(saveVenteBar);
            setApprovisionnement(saveAppro);
            setBenefice(saveBenef); 
            setMonth(dateSetter(data));
        } else {
            
            setVenteBar([]);
            setApprovisionnement([]);
            setBenefice([]); 
            setMonth([]);
        }
    }
}, [data]);

    useEffect (() => {
        fetchData();
    }, [year]);

    //****************redirect to the login page if login error************* */
            useTokenError(error);
    /////////////////////*************/////////////////// */


    return {venteBar, approvisionnement, benefice, month, loading, error};
}