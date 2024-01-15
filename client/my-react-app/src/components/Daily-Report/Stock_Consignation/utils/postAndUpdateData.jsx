import axios from '../../../../axiosUrl';
import { useState } from 'react';
import useDateParams from '../../../reuseFunction/dateParams';
import formatDate from '../../../reuseFunction/rightFormatDate';

export default function usePostAndUpdateData ({componentName, productName, venteName}) {

    //p and u mean post and update 
    //means the data from post and update 
    const [pAnduVente, setPandUVente] = useState (0);
    const [pAnduId, setPandUId] = useState (null);
    const [pAnduData, setPandUData] = useState(null);
    const [pAnduUpdate, setPandUUpdate] = useState(true);
    const [pAnduReadOnly, setPandUReadOnly] = useState(true);
    const [ pAnduLoading, setPandULoading] = useState(false);
    const [pAnduError, setPandUError] = useState('');

    //the date using in the query string
    const {year, month, day, dateState} = useDateParams();

    async function postAndUpdate (array, id, vente) {
        //reinitialize some state to set the loading page
        setPandUError('');
        setPandULoading(true);
        //filter the data and delete all data with an empty name
        const  saveData = array.filter (el => el.name !== "");
        
        if (saveData.length > 0) {

            try {
                
                //put the date in the rigth format
                const createdAt = formatDate(year, month, day);
                //modeling data to our schema in backend
                const newData = saveData.map (el => {
                    return {
                        name: el.name,
                        data: {
                            data: {
                                data: {...el, createdAt: createdAt}
                            }
                        }
                    }
                });

                const newVenteData = {
                    valeur: vente,
                    createdAt: createdAt
                };

                // if id exist so we update the data if not we only send the new Data to the server
                const dataResponse = id ? await axios.post(`/${componentName}/${productName}/rapportJournalier/${year}/${month}/${day}`, {id: [...id], data: [...newData]}) : await axios.post (`/${componentName}/${productName}/rapportJournalier?year=${year}&month=${month}&day=${day}`, newData);
                const venteResponse = id ? await axios.post(`/${componentName}/vente/${year}/${month}/${day}`, newVenteData) : await axios.post (`/${componentName}/vente?year=${year}&month=${month}&day=${day}`, newVenteData);

                //set the data in our local storage
                if (dateState) {
                    localStorage.setItem(productName + componentName, JSON.stringify({
                        date: {
                            year: year,
                            month: month,
                            day: day
                        },
                        data: dataResponse.data.data.day.map ((el, index) => {return {...el, id: index}}),
                        id: dataResponse.data.data.id
                    }));
                    localStorage.setItem(venteName, venteResponse.data.data.day.valeur);
                };
                //set the data 
                setPandUVente(prev => venteResponse.data.data.day.valeur);
                setPandUId( prev => dataResponse.data.data.id);
                setPandUData(prev => dataResponse.data.data.day.map ((el, index) => {return {...el, id: index}}));
                setPandUUpdate(prev => true);
                setPandUReadOnly(prev => true);
            } catch (e) {
                setPandUError(prev => e);
                setPandULoading(prev => false);
            } finally {
                setPandULoading(prev => false);
            };
        } else {
            setPandUData(prev => []);
            setPandUUpdate(prev => false);
            setPandUReadOnly ( prev => false);
        };
    };

    return {pAnduData, pAnduError, pAnduId, pAnduLoading, pAnduReadOnly, pAnduUpdate, pAnduVente, postAndUpdate}
};