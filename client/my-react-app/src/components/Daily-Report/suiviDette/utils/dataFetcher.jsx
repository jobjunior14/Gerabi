import axios from 'axios';
import { useEffect, useState } from 'react';
import useDateParams from '../../../reuseFunction/dateParams';
import indexSetter from '../../../reuseFunction/indexSetter';

axios.defaults.baseURL = "http://localhost:5001/api/v1";
export default function useDataFetcherSuiviStock ({componentName}) {
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); 
    const [update, setUpdate] = useState(true);
    const [readOnly, setReadOnly] = useState(true);
    const [agentsData, setAgentsData] = useState(null);
    const [musiciensData, setMusiciensData] = useState(null);
    const [ClientsData, setClientsData] = useState(null);
    //the total amount of debt by category
    const [totDetailDetteAndPaymentAgents, setTotDetailDetteAndPaymentAgents] = useState(null);
    const [totDetailDetteAndPaymentMusiciens, setTotDetailDetteAndPaymentMusiciens] = useState(null);
    const [totDetailDetteAndPaymentClients, setTotDetailDetteAndPaymentClients] = useState(null);
    //everything start with *your* keyword refer to the user (the owner)
    const [yourDebt, setYourDebt] = useState(null);
    const [ yourTotalDebtAndPayment ,setYourTotalDebtAndPayment] = useState(null);
    const [ yourTotalDetailDebtAndPayment ,setYourTotalaDetailDebtAndPayment] = useState(null);
    //params date using in the whole app
    const {year, month, day} = useDateParams();

    const fetchData = async () => {
      try {
        //reinitialize some state to see the loading page while fetching data

        const suiviDetteData = await axios.get(`/${componentName}/suiviDette/rapportJournalier/${year}/${month}/${day}`);
        //*your* refer to the owner of the application 
        const yourSuiviDetteData = await axios.get (`/${componentName}/yourSuiviDette/rapportJournalier/${year}/${month}/${day}`);
        const totDetailDetteAndPayment = await axios.get (`/${componentName}/suiviDette/rapportMensuel/detail/${year}/${month}`);
        const yourTotDetailDetteAndPayment = await axios.get (`/${componentName}/yourSuiviDette/rapportMensuel/detail/${year}/${month}`);

        if (suiviDetteData.data.data.agents.length > 0 && suiviDetteData.data.data.musiciens.length > 0 && suiviDetteData.data.data.clients.length > 0 ) {

          setUpdate(true);
          setReadOnly(true);

          setAgentsData(indexSetter(suiviDetteData.data.data.agents));
          setClientsData(indexSetter(suiviDetteData.data.data.clients));
          setMusiciensData(indexSetter(suiviDetteData.data.data.musiciens));

            
        }





      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }



}