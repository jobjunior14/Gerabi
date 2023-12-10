import axios from 'axios';
import { useEffect, useState } from 'react';
import useDateParams from '../../../reuseFunction/dateParams';
import formatData from '../../../reuseFunction/rightFormatDate';
import { deleteEmptyName } from './arrayUtils';
import { dateSetter } from './arrayUtils';
import indexSetter from '../../../reuseFunction/indexSetter';

axios.defaults.baseURL = "http://localhost:5001/api/v1";

export default function usePostAndUpdata ({componentName}) {

    //the *p* before variables refer to the post and update data 
    const [pError, setError] = useState('');
    const [pLoading, setLoading] = useState(false); 
    const [pCustomUpdate, setUpdate] = useState(false);
    const [pReadOnly, setReadOnly] = useState(true);
    const [pAgentsData, setAgentsData] = useState(null);
    const [pMusiciensData, setMusiciensData] = useState(null);
    const [pClientsData, setClientsData] = useState(null);
    const [pTotalDebt, setTotalDette] = useState(null);
    //the total amount of debt by category
    const [pTotDetailDetteAndPaymentAgents, setTotDetailDetteAndPaymentAgents] = useState(null);
    const [pTotDetailDetteAndPaymentMusiciens, setTotDetailDetteAndPaymentMusiciens] = useState(null);
    const [pTotDetailDetteAndPaymentClients, setTotDetailDetteAndPaymentClients] = useState(null);
    ////////////everything start with *your* keyword refer to the user (the owner)///////////////
    const [pYourDebt, setYourDebt] = useState(null);
    const [pYourTotalDebtAndPayment ,setYourTotalDebtAndPayment] = useState(null);
    const [pYourTotalDetailDebtAndPayment ,setYourTotalaDetailDebtAndPayment] = useState(null);
    //params date using in the whole app
    const {year, month, day} = useDateParams();

    async function postAndUpdate (agents, musiciens, clients, update, yourDebt) {
        //variables allows us to see the loading page while fetching data
        setError('');
        setLoading(true);
        //modeling date/set it to the right format for our database
        let createdAt = formatData (year, month, day);

        //modeling data for backend 
        const newDataSuiviDette = {
            data: {
                data: {
                    agents: deleteEmptyName(dateSetter(agents, createdAt)),
                    musiciens: deleteEmptyName(dateSetter(musiciens, createdAt)),
                    clients: deleteEmptyName(dateSetter(clients, createdAt))
                }
            }
        };

        const newDataYourSuiviDette = {
            data: {
                data: {
                    fournisseurs : deleteEmptyName (dateSetter(yourDebt, createdAt))
                }
            }
        };

        const responseSuiviDette = !update ? await axios.post(`/${componentName}/suiviDette/rapportJournalier?year=${year}&month=${month}&day=${day}`, newDataSuiviDette) : 
            await axios.post(`/${componentName}/suiviDette/rapportJournalier/${year}/${month}/${day}`, newDataSuiviDette);
        const responseYourSuiviDette = !update ? await axios.post(`/${componentName}/yourSuiviDette/rapportJournalier?year=${year}&month=${month}&day=${day}`, newDataYourSuiviDette) : 
            await axios.post(`/${componentName}/yourSuiviDette/rapportJournalier/${year}/${month}/${day}`, newDataYourSuiviDette);

        const totDetailDetteAndPayment = await axios.get (`/${componentName}/suiviDette/rapportMensuel/detail/${year}/${month}`);
        const yourTotDetailDetteAndPayment = await axios.get (`/${componentName}/yourSuiviDette/rapportMensuel/detail/${year}/${month}`);
        //set the all the total amout dabt and payments
        setTotDetailDetteAndPaymentAgents(totDetailDetteAndPayment.data.data.agents);
        setTotDetailDetteAndPaymentClients(totDetailDetteAndPayment.data.data.clients);
        setTotDetailDetteAndPaymentMusiciens(totDetailDetteAndPayment.data.data.musiciens);
        //set *your* total debt and payment
        setYourTotalaDetailDebtAndPayment(yourTotDetailDetteAndPayment.data.data.fournisseurs);
        /////////////////////////////////////////////////////////////////////
        setAgentsData(indexSetter(responseSuiviDette.data.data.agents));
        setClientsData(indexSetter(responseSuiviDette.data.data.clients));
        setMusiciensData(indexSetter(responseSuiviDette.data.data.musiciens));
        /////////////////
        setTotDetailDetteAndPaymentAgents(totDetailDetteAndPayment.data.data.agents);
        setTotDetailDetteAndPaymentClients(totDetailDetteAndPayment.data.data.clients);
        setTotDetailDetteAndPaymentMusiciens(totDetailDetteAndPayment.data.data.musiciens);
        //set *your debt *
        setYourDebt(indexSetter(responseYourSuiviDette.data.data.fournisseurs));
        ///////////////////
        setUpdate(true);
        setReadOnly(true);

        responseSuiviDette.data.data.totalDette ? setTotalDette (responseSuiviDette.data.data.totalDette) : 
            setTotalDette (0);
        
        //set *your* debt
        responseYourSuiviDette.data.data.totalDette ? setYourTotalDebtAndPayment (responseYourSuiviDette.data.data.totalDette) : 
            setYourTotalDebtAndPayment(0);
        try {
            
        } catch (error) {
            setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
        };
    };

    return {
        pError,
        pLoading,
        pCustomUpdate,
        pReadOnly,
        pAgentsData,
        pMusiciensData,
        pClientsData,
        pTotalDebt,
        pTotDetailDetteAndPaymentAgents,
        pTotDetailDetteAndPaymentMusiciens,
        pTotDetailDetteAndPaymentClients,
        pYourDebt,
        pYourTotalDebtAndPayment,
        pYourTotalDetailDebtAndPayment,
        postAndUpdate
    }
}