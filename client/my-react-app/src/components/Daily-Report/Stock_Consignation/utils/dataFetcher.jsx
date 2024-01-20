import { useEffect, useState } from "react";
import axios from "../../../../axiosUrl";
import objProvider from "./objProvider";
import useDateParams from "../../../reuseFunction/dateParams";
import indexSetter from "../../../reuseFunction/indexSetter";
import useTokenError from "../../../errorPages/tokenError";
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
    const [error, setError] = useState(null);

    const headers = {
        headers: {
            "content-type": "application/json", "withCredentials": true,
            'Authorization': `Bearer ${localStorage.getItem('jwtA')}`
        }
    };
    const fetchData = async () =>{
        //reinitialize some state to see the loading page while posting data
        setLoading(true);
        setError(null);
        try {

            if (year < currentYear || month < currentMonth || day < currentDay) {

                //the main data
                const apiData = await axios.get(`/${componentName}/${productName}/rapportJournalier/${year}/${month}/${day}`, headers);
                const venteData = await axios.get(`/${componentName}/vente/${year}/${month}/${day}`, headers);
                //if there is an existing data 
            
                if (apiData.data.data.day.length > 0) {
                    setVente(venteData.data.data.day.valeur);
                    setData(indexSetter(apiData.data.data.day));
                    setCustomId(apiData.data.data.id);
                    setCustomUpdate(true);
                    setReadOnly(true);
                    
                } else {
                    //if there is no data on the current day
                    //we call an api how give use the lastet date created from the server
                    const lastcreatedData = await axios.get(`/${componentName}/${productName}/rapportJournalier/lastElement`, headers);

                    if (lastcreatedData.data.data) {

                        setVente(0);
                        setData (lastcreatedData.data.data.map((el, index) =>  objProvider(componentName, el, index)));
                        setCustomUpdate(false);
                        setReadOnly(false);
                    } else {
                        setVente(0);
                        setData([]);
                        setCustomId([]);
                        setCustomUpdate(false);
                        setReadOnly(false);
                    }
                }

            } else if (day === currentDay && month === currentMonth && year === currentYear) {
                
                //if we are in searching of the data's current day
                //we look in the local storage fist 
                const dataFromLocalStorage = JSON.parse(localStorage.getItem(productName + componentName));
                const dataVenteFromLocalStorage = JSON.parse(localStorage.getItem(venteName));
                if ((dataFromLocalStorage && dataFromLocalStorage.data.length > 0) && (dataFromLocalStorage.date.year === year && dataFromLocalStorage.date.month === month && dataFromLocalStorage.date.day === day)) {
                    
                    //****if data exist in local storage and have the same data */
                    //******we load it  */
                    setVente (dataVenteFromLocalStorage);
                    setData(dataFromLocalStorage.data);
                    setCustomId (dataFromLocalStorage.id);
                    setCustomUpdate(true);
                    setReadOnly (true);


                } else {
                        
                    //the main data
                    const apiData = await axios.get(`/${componentName}/${productName}/rapportJournalier/${year}/${month}/${day}`, headers);
                    const venteData = await axios.get(`/${componentName}/vente/${year}/${month}/${day}`, headers); 
                    
                    if (apiData.data.data.day.length === 0) {
                        
                        //if there is no data on the current day
                        //we call an api how give use the lastet date created from the server
                        const lastcreatedData = await axios.get(`/${componentName}/${productName}/rapportJournalier/lastElement`, headers);
                        
                        venteData.data.data.day ? setVente ( venteData.data.data.day.valeur) :
                            setVente(0);
                        setCustomUpdate( false);
                        setReadOnly ( false);
                        
                        lastcreatedData.data.data ? setData (lastcreatedData.data.data.map((el, index) => objProvider(componentName, el, index))) : 
                        setData( []);
                        
                    } else {
                        
                        //setting the existing data
                        venteData.data.data.day ? setVente(venteData.data.data.day.valeur) :  setVente(0)
                        setData(indexSetter(apiData.data.data.day));
                        setCustomId(apiData.data.data.id);
                        setCustomUpdate(true);
                        setReadOnly(true);
                    }
                }
            }
        } catch (err) {
            setError(err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [year, month, day, productName, componentName, venteName]);

        //****************redirect to the login page if login error************* */
                    useTokenError(error);
        /////////////////////*************/////////////////// */
    return {vente, customId, data, customUpdate, readOnly, loading, error};
}