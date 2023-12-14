import axios from 'axios';
import { useEffect, useState } from 'react';
import useDateParams from '../../../reuseFunction/dateParams';
import indexSetter from '../../../reuseFunction/indexSetter';

axios.defaults.baseURL = "http://localhost:5001/api/v1";

export default function useDataFetcherSuiviDepense ({componentName}) {
    
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [customUpdate, setUpdate] = useState(false);
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
      const totDetailDetteAndPayment = await axios.get (`/${componentName}/suiviDette/rapportMensuel/detail/${year}/${month}`);
      //*your* refer to the owner of the application 
      const yourSuiviDetteData = await axios.get (`/${componentName}/yourSuiviDette/rapportJournalier/${year}/${month}/${day}`);
      const yourTotDetailDetteAndPayment = await axios.get (`/${componentName}/yourSuiviDette/rapportMensuel/detail/${year}/${month}`);

      if (suiviDetteData.data.data.agents.length > 0 || suiviDetteData.data.data.musiciens.length > 0 || suiviDetteData.data.data.clients.length > 0 ) {

        setUpdate(true);
        setReadOnly(true);

        setAgentsData(indexSetter(suiviDetteData.data.data.agents));
        setClientsData(indexSetter(suiviDetteData.data.data.clients));
        setMusiciensData(indexSetter(suiviDetteData.data.data.musiciens));
        //set the total payments and debt
        setTotDetailDetteAndPaymentAgents(totDetailDetteAndPayment.data.data.agents);
        setTotDetailDetteAndPaymentClients(totDetailDetteAndPayment.data.data.clients);
        setTotDetailDetteAndPaymentMusiciens(totDetailDetteAndPayment.data.data.musiciens);
      } else {

        setUpdate(false);
        setReadOnly(false);

        //getting the last created data (specifically name and their total amout on the month)
        const lastCreatedData = await axios.get(`/${componentName}/suiviDette/lastElement/${year}/${month}`);

        if (lastCreatedData.data.data) {

          setTotDetailDetteAndPaymentAgents(totDetailDetteAndPayment.data.data.agents);
          setTotDetailDetteAndPaymentClients(totDetailDetteAndPayment.data.data.musiciens);
          setTotDetailDetteAndPaymentMusiciens(totDetailDetteAndPayment.data.data.clients);
            
          setAgentsData(indexSetter(lastCreatedData.data.data.agents));
          setMusiciensData(indexSetter(lastCreatedData.data.data.musiciens))
          setClientsData(indexSetter(lastCreatedData.data.data.clients));
        } else {
          //set the total amount debt and payment   
          setTotDetailDetteAndPaymentAgents([]);
          setTotDetailDetteAndPaymentMusiciens([]);
          setTotDetailDetteAndPaymentClients([]);

          setAgentsData([]);
          setClientsData([]);
          setMusiciensData([]);
        };
      };

      //**your debt*/
      if (yourSuiviDetteData.data.data.fournisseurs.length > 0) {
        setYourDebt(indexSetter(yourSuiviDetteData.data.data.fournisseurs));
        //set the total amount debt
        setYourTotalaDetailDebtAndPayment(yourTotDetailDetteAndPayment.data.data.fournisseurs);

      } else {
        
        const yourLastCreatedData = await axios.get(`${componentName}/yourSuiviDette/lastElement/${year}/${month}`);
        if (yourLastCreatedData.data.data) {

          setYourDebt(indexSetter(yourLastCreatedData.data.data.fournisseurs));
            //set the total amount debt
            setYourTotalaDetailDebtAndPayment(yourTotDetailDetteAndPayment.data.data.fournisseurs);
        } else {
          setYourDebt([]);
          setYourTotalaDetailDebtAndPayment([]);
          setYourTotalDebtAndPayment(0);
        }
      };


    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    };
  };

  useEffect (() => {
    fetchData();
    console.log('data fetche');
  }, [year, month, day, componentName]);

  return {error, 
    loading, 
    customUpdate, 
    readOnly, 
    agentsData, 
    musiciensData, 
    ClientsData, 
    totDetailDetteAndPaymentAgents,
    totDetailDetteAndPaymentClients, 
    totDetailDetteAndPaymentMusiciens, 
    yourDebt, 
    yourTotalDebtAndPayment, 
    yourTotalDetailDebtAndPayment
  }

}