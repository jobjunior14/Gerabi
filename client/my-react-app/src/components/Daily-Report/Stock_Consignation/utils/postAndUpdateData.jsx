import axios from '../../../../axiosUrl';
import { useState } from 'react';
import useDateParams from '../../../reuseFunction/dateParams';
import formatDate from '../../../reuseFunction/rightFormatDate';
import useTokenError from '../../../errorPages/tokenError'
export default function usePostAndUpdateData ({componentName, productName, venteName}) {

    //p and u mean post and update 
    //means the data from post or update options 
    const [pAnduVente, setPandUVente] = useState (0);
    const [pAnduId, setPandUId] = useState (null);
    const [pAnduData, setPandUData] = useState(null);
    const [pAnduUpdate, setPandUUpdate] = useState(true);
    const [pAnduReadOnly, setPandUReadOnly] = useState(true);
    const [ pAnduLoading, setPandULoading] = useState(false);
    const [pAnduError, setPandUError] = useState(null);

    //the date using in the query string
    const {year, month, day, dateState} = useDateParams();

    const headers = {
        headers: {
            "content-type": "application/json", withCrudential: true,
            'authorization': `Bearer ${localStorage.getItem('jwtA')}`
        }
    };

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
                const dataResponse = id ? await axios.post(`/${componentName}/${productName}/rapportJournalier/${year}/${month}/${day}`, {id: [...id], data: [...newData]}, headers ) : await axios.post (`/${componentName}/${productName}/rapportJournalier?year=${year}&month=${month}&day=${day}`, newData, headers );
                const venteResponse = id ? await axios.post(`/${componentName}/vente/${year}/${month}/${day}`, newVenteData, headers ) : await axios.post (`/${componentName}/vente?year=${year}&month=${month}&day=${day}`, newVenteData, headers );

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
                }
                //set the data 
                setPandUVente( venteResponse.data.data.day.valeur);
                setPandUId(  dataResponse.data.data.id);
                setPandUData( dataResponse.data.data.day.map ((el, index) => {return {...el, id: index}}));
                setPandUUpdate( true);
                setPandUReadOnly( true);
            } catch (e) {
                setPandUError(e);
                setPandULoading( false);
            } finally {
                setPandULoading( false);
            }
        } else {
            setPandUData( []);
            setPandUUpdate( false);
            setPandUReadOnly (  false);
        }
    }

        //****************redirect to the login page if login error************* */
                    useTokenError(pAnduError);
        /////////////////////*************/////////////////// */

    return {pAnduData, pAnduError, pAnduId, pAnduLoading, pAnduReadOnly, pAnduUpdate, pAnduVente, postAndUpdate}
}