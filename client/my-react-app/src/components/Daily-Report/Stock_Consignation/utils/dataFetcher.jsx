import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import objProvider from "./objProvider";

axios.defaults.baseURL = "http://localhost:5001/api/v1";

const useDataFetcherSuiviStock = ({mainUrl, venteUrl, lastCreatedUrl}, {componentName, productName, venteName}, {year, month, day } ) =>{


    //getting the current date
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDay();
    //date it's all the date we are using in the component and component data
    //is all the date about the component 
    const [vente, setVente] = useState (0);
    const [id, setId] = useState (null);
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(true);
    const [readOnly, setReadOnly] = useState(true);
    const [ loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () =>{

        try {

            if (year < currentYear || month < currentMonth || day < currentDay) {

                //the main data
                const apiData = await axios.get(mainUrl);
                const venteData = await axios.get(venteUrl);

                //if there is an existing data 
                if (apiData.data.data.length > 0) {
                    setVente(prev => venteData.data.data.day.valeur);
                    setData(prev => apiData.data.data.day.map((el, index) => { return { ...el, id: index }}));
                    setId(prev => apiData.data.data.id);
                    setUpdate(prev => true);
                    setReadOnly(prev => true);
                    
                } else {
                    //if there is no data on the current day
                    //we call an api how give use the lastet date created from the server
                    const lastcreatedData = await axios.get(lastCreatedUrl);

                    if (lastcreatedData.data.data) {

                        setVente(prev => 0);
                        setData (prev => lastcreatedData.data.data.map((el, index) =>  objProvider(componentName, el, index)));
                        setUpdate(prev => false);
                        setReadOnly(prev => false);
                    } else {
                        setVente(prev => 0);
                        setData(prev => []);
                        setId(prev => []);
                        setUpdate(prev => false);
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
                        setId (dataFromLocalStorage.id);
                        setUpdate(prev => true);
                        setReadOnly (prev => true);
                    } else {
                        
                        //the main data
                        const apiData = await axios.get(mainUrl);
                        const venteData = await axios.get(venteUrl); 
                        if (apiData.data.data.day.length === 0) {
                            
                            //if there is no data on the current day
                            //we call an api how give use the lastet date created from the server
                            const lastcreatedData = await axios.get(lastCreatedUrl);
                            
                            venteData.data.data.day ? setVente (prev => venteData.data.data.day.valeur) :
                            setVente(prev => 0);
                            setUpdate(prev => false);
                            setReadOnly (prev => false);
                            
                            lastcreatedData.data.data ? setData (prev => lastcreatedData.data.data.map((el, index) => objProvider(props.componentName, el, index))) : 
                            setData(prev => []);
                            
                        } else {
                            
                            //setting the existing data
                            setVente(prev => venteData.data.data.day.valeur);
                            setData(prev => apiData.data.data.day.map((el, index) => { return { ...el, id: index }}));
                            setId(prev => apiData.data.data.id);
                            setUpdate(prev => true);
                            setReadOnly(prev => true);
                        };
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
    }, []);

    return {vente, id, data, update, readOnly, loading, error};
}