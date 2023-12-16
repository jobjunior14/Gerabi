import { useState, useEffect } from "react";
import useDateParams from "../../../../reuseFunction/dateParams";
import axios from 'axios';
import { dateSetter } from "./yearsStatsArrayUtils";
axios.defaults.baseURL = 'http://localhost:5001/api/v1';

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
    const fetchData = async () => {
        setLoading(true);
        try {
            const apiData = await axios.get (`/${componentName}/${productName}/rapportMensuel/yearStats/${year}`);
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
            };
            setVenteBar(saveVenteBar);
            setApprovisionnement(saveAppro);
            setBenefice(saveBenef); 
            setMonth(dateSetter(data));
        };
    };

}, [data]);
    useEffect (() => {
        fetchData();
    }, [year]);

    return {venteBar, approvisionnement, benefice, month, loading, error};
}