import { useEffect, useState } from "react";
import axios from "axios";
import objProvider from "./objProvider";
import useDateParams from "../../../reuseFunction/dateParams";
import indexSetter from "../../../reuseFunction/indexSetter";


axios.defaults.baseURL = "http://localhost:5001/api/v1";

export default function useDataFetcherSuiviStock ({componentName, productName, venteName}) {
    //the date using in the query string and the current date 
    const {year, month, day, currentDay, currentMonth, currentYear} = useDateParams();
    //data
    const [vente, setVente] = useState (0);
    const [customId, setCustomId] = useState (null);
    const [data, setData] = useState(null);
    const [customUpdate, setCustomUpdate] = useState(true);
    const [readOnly, setReadOnly] = useState(true);
    const [ loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchData = async () =>{
        //reinitialize some state to see the loading page while posting data
        setLoading(true);
        setError('');
        try {

            if (year < currentYear || month < currentMonth || day < currentDay) {

                //the main data
                const apiData = await axios.get(`/${componentName}/${productName}/rapportJournalier/${year}/${month}/${day}`);
                const venteData = await axios.get(`/${componentName}/vente/${year}/${month}/${day}`);
                //if there is an existing data 
            
                if (apiData.data.data.day.length > 0) {
                    setVente(prev => venteData.data.data.day.valeur);
                    setData(prev => indexSetter(apiData.data.data.day));
                    setCustomId(prev => apiData.data.data.id);
                    setCustomUpdate(prev => true);
                    setReadOnly(prev => true);
                    
                } else {
                    //if there is no data on the current day
                    //we call an api how give use the lastet date created from the server
                    const lastcreatedData = await axios.get(`/${componentName}/${productName}/rapportJournalier/lastElement`);

                    if (lastcreatedData.data.data) {

                        setVente(prev => 0);
                        setData (prev => lastcreatedData.data.data.map((el, index) =>  objProvider(componentName, el, index)));
                        setCustomUpdate(prev => false);
                        setReadOnly(prev => false);
                    } else {
                        setVente(prev => 0);
                        setData(prev => []);
                        setCustomId(prev => []);
                        setCustomUpdate(prev => false);
                        setReadOnly(prev => false);
                    }
                }

            } else if (day === currentDay && month === currentMonth && year === currentYear) {
                
                //if we are in searching of the data's current day
                //we look in the local storage fist 
                const dataFromLocalStorage = JSON.parse(localStorage.getItem(productName + componentName));
                const dataVenteFromLocalStorage = JSON.parse(localStorage.getItem(venteName));
                
                if (dataFromLocalStorage && dataFromLocalStorage.data.length > 0) {
                    
                    if (dataFromLocalStorage.date.year === year && dataFromLocalStorage.date.month === month && dataFromLocalStorage.date.day === day) {
                        
                        setVente (dataVenteFromLocalStorage);
                        setData(dataFromLocalStorage.data);
                        setCustomId (dataFromLocalStorage.id);
                        setCustomUpdate(prev => true);
                        setReadOnly (prev => true);
                    };
                } else {
                        
                    //the main data
                    const apiData = await axios.get(`/${componentName}/${productName}/rapportJournalier/${year}/${month}/${day}`);
                    const venteData = await axios.get(`/${componentName}/vente/${year}/${month}/${day}`); 
                    if (apiData.data.data.day.length === 0) {
                        
                        //if there is no data on the current day
                        //we call an api how give use the lastet date created from the server
                        const lastcreatedData = await axios.get(`/${componentName}/${productName}/rapportJournalier/lastElement`);
                        
                        venteData.data.data.day ? setVente (prev => venteData.data.data.day.valeur) :
                            setVente(prev => 0);
                        setCustomUpdate(prev => false);
                        setReadOnly (prev => false);
                        
                        lastcreatedData.data.data ? setData (prev => lastcreatedData.data.data.map((el, index) => objProvider(componentName, el, index))) : 
                        setData(prev => []);
                        
                    } else {
                        
                        //setting the existing data
                        venteData.data.data.day ? setVente(prev => venteData.data.data.day.valeur) :  setVente(prev => 0)
                        setData(prev => indexSetter(apiData.data.data.day));
                        setCustomId(prev => apiData.data.data.id);
                        setCustomUpdate(prev => true);
                        setReadOnly(prev => true);
                    };
                };
            };
        } catch (err) {
            setError(err);
            setLoading(false);
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        fetchData();
    }, [year, month, day, productName, componentName, venteName]);

    return {vente, customId, data, customUpdate, readOnly, loading, error};
}