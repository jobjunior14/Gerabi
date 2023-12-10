import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { suiviDetteActions } from "../../store/suiviDette-slice";
import DailyFilter from "../../filter/filterDailyRap";
import Clients from "./clients"
import Musiciens from "./musiciens";
import Agents from "./agents";
import TotDetteDaily from "./totalDetteDaily";
import YourDebts from "./yourDebt";
import YourTotDetteDaily from "./yourTotDetteDaily";
import useDateParams from "../../reuseFunction/dateParams";
import useDataFetcherSuiviDette from "./utils/dataFetcher";
import usePostAndUpdata from "./utils/postAndUpadateData";

export default function SuiviDette ({componentName}) {

    const dispatch = useDispatch ();
    
    //params's date using in the whole app
    const {year, month, day, currentDay, currentMonth, currentYear, setterDateParams} = useDateParams();
    
    //date in fields
    const date = useSelector (state => state.suiviDette.date);
    
    const update = useSelector(state => state.suiviDette.update);
    //data 
    const agents = useSelector(state => state.suiviDette.agents);
    const clients = useSelector(state => state.suiviDette.clients);
    const musiciens = useSelector(state => state.suiviDette.musiciens);

    const fournisseurs = useSelector(state => state.suiviDette.fournisseurs);



    //data fetcher 
    const {error, 
        loading, 
        customUpdate, 
        readOnly, 
        agentsData, 
        musiciensData, 
        ClientsData, 
        totalDebt, 
        totDetailDetteAndPaymentAgents,
        totDetailDetteAndPaymentClients, 
        totDetailDetteAndPaymentMusiciens, 
        yourDebt, 
        yourTotalDebtAndPayment, 
        yourTotalDetailDebtAndPayment
    } = useDataFetcherSuiviDette({componentName});

    const {
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
    } = usePostAndUpdata({componentName});

    //dispatch the fetched data acrosse all the components
    useEffect(() => {

        dispatch(suiviDetteActions.setUpdate(customUpdate));
        dispatch(suiviDetteActions.setReadOnly(readOnly));

        dispatch(suiviDetteActions.setAgents(agentsData));
        dispatch(suiviDetteActions.setClients(ClientsData));
        dispatch(suiviDetteActions.setMusiciens(musiciensData));
        //set the total amount debt and payment 
        dispatch(suiviDetteActions.setDetailTotDetteAgents(totDetailDetteAndPaymentAgents)); 
        dispatch(suiviDetteActions.setDetailTotDetteMusiciens(totDetailDetteAndPaymentMusiciens));
        dispatch(suiviDetteActions.setDetailTotDetteClients(totDetailDetteAndPaymentClients));

        //all data refering to the owner
        //*fournisseur* refer the people you took debt from 
        dispatch(suiviDetteActions.setFournisseurs(yourDebt));
        dispatch(suiviDetteActions.setDetailTotDetteFournisseurs(yourTotalDetailDebtAndPayment));
        dispatch(suiviDetteActions.setYourTotalDette(yourTotalDebtAndPayment));

    }, [musiciensData, agentsData, ClientsData, totDetailDetteAndPaymentAgents, totDetailDetteAndPaymentClients, totDetailDetteAndPaymentMusiciens, yourTotalDebtAndPayment,yourDebt,totalDebt,yourTotalDetailDebtAndPayment]);

    //set the updating and posting data
    useEffect(() => {

        dispatch(suiviDetteActions.setUpdate(pCustomUpdate));
        dispatch(suiviDetteActions.setReadOnly(pReadOnly));

        dispatch(suiviDetteActions.setAgents(pAgentsData));
        dispatch(suiviDetteActions.setClients(pClientsData));
        dispatch(suiviDetteActions.setMusiciens(pMusiciensData));
        //set the total amount debt and payment 
        dispatch(suiviDetteActions.setDetailTotDetteAgents(pTotDetailDetteAndPaymentAgents)); 
        dispatch(suiviDetteActions.setDetailTotDetteMusiciens(pTotDetailDetteAndPaymentMusiciens));
        dispatch(suiviDetteActions.setDetailTotDetteClients(pTotDetailDetteAndPaymentClients));

        //all data refering to the owner
        //*fournisseur* refer the people you took debt from 
        dispatch(suiviDetteActions.setFournisseurs(pYourDebt));
        dispatch(suiviDetteActions.setDetailTotDetteFournisseurs(pYourTotalDetailDebtAndPayment));
        dispatch(suiviDetteActions.setYourTotalDette(pYourTotalDebtAndPayment));

    }, [pMusiciensData, pAgentsData, pClientsData, pTotDetailDetteAndPaymentAgents, pTotDetailDetteAndPaymentClients, pTotDetailDetteAndPaymentMusiciens, pYourTotalDebtAndPayment,pYourDebt,pTotalDebt,pYourTotalDetailDebtAndPayment]);

    useEffect(() => {
        setterDateParams (date);
    }, [componentName]);

    function setFilterParams() {
        setterDateParams(date);
    };

    function postData () {

        postAndUpdate(agents, musiciens, clients, false, fournisseurs);
    };

    function updateData () {

        postAndUpdate(agents, musiciens, clients, true, fournisseurs);
    };
    
    if (year > currentYear && month > currentMonth && day > currentDay) {

        return (
            <div>
                <DailyFilter component = {'suiviDette'} prev = {date} onclick = {setFilterParams} />
                <h1> Ooouups vous ne pouvez demander une donnee d'une date inexistante </h1>
            </div>
        );
    } else {
        console.log(loading || pLoading);
        return (<div>
            <DailyFilter component = {'suiviDette'}  prev = {date} onclick = {setFilterParams}/>
            <Agents loading = {loading || pLoading}/>
            <Clients loading = {loading || pLoading}/>
            <Musiciens loading = {loading || pLoading}/>
            <TotDetteDaily day = {day} month = {month} year = {year} />
            <YourDebts loading = {loading || pLoading}/>
            <YourTotDetteDaily day = {day} month = {month} year = {year} />
            {!update ? <button onClick={postData}> Enregistrer les données</button> : <button onClick={updateData}> Mettre à les données</button> }
            {error !== ''  && <h2>{error.response.data.erro.message}</h2>}
            {pError !== "" && <h2>{pError.response.data.erro.message}</h2>}


        </div>);
    };
}
