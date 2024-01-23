import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { suiviDetteActions } from "../../store/suiviDette-slice";
import DailyFilter from "../../filter/filterDailyRap";
import TotDetteDaily from "./totalDetteDaily";
import YourTotDetteDaily from "./yourTotDetteDaily";
import useDateParams from "../../reuseFunction/dateParams";
import useDataFetcherSuiviDette from "./utils/dataFetcher";
import usePostAndUpdata from "./utils/postAndUpadateData";
import useParamsGetter from "../../reuseFunction/paramsGetter";
import searchImage from "../../../assets/searchImage.png"
import AllDebtComp from "./components/allDebtComponent";

export default function SuiviDette () {

    const dispatch = useDispatch ();
    //stateAction is here to know wich component is using the data based to current usrl using the Params data
    const {componentName} = useParamsGetter();

    //params's date using in the whole app
    const {year, month, day, no_existent, setterDateParams} = useDateParams();
    
    //date in fields
    const [date, setDate] = useState({year, month, day});
    
    const update = useSelector(state => state.suiviDette.update);
    //data 
    const agents = useSelector(state => state.suiviDette.agents);
    const clients = useSelector(state => state.suiviDette.clients);
    const musiciens = useSelector(state => state.suiviDette.musiciens);
    //fournisseur is reladted to ***yourSuivi Dette Data******
    const fournisseurs = useSelector(state => state.suiviDette.fournisseurs);

    //data fetcher 
    const {
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
        yourTotalDetailDebtAndPayment,
        error
    } = useDataFetcherSuiviDette({componentName});

    const {
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
        postAndUpdate,
        pError
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

    function handleDate (name, value) {
        //don't allow user to set a negative date or equal to 0
        if (value <= 0) value = '';
        setDate(prev => ({...prev, [name]: value}));
        
    }
    
    function setFilterParams() {
        setterDateParams(date);
    }

    function postData () {

        postAndUpdate(agents, musiciens, clients, false, fournisseurs);
    }

    function updateData () {

        postAndUpdate(agents, musiciens, clients, true, fournisseurs);
    }

    if (no_existent) {

        return (
            <>
                <DailyFilter onchange={handleDate}  prev = {date} onclick = {setFilterParams}/>
                <div className=" flex items-center justify-center h-3/4">
                    <img className=" h-96 w-auto" src={searchImage} alt="search image" />
                </div>
                <h1 className="text-4xl text-gray-700"> Ouuups!!! vous ne pouvez demander une donnée d'une date inexistante</h1>
            </>
        );
    } else {
        
        return (<div>
            <DailyFilter onchange={handleDate}  prev = {date} onclick = {setFilterParams}/>
            <AllDebtComp 
                loading = {loading || pLoading} 
                error={error} 
                pError={pError}
                debtName={'agents'}
                totalDetailDebtName={'detailTotDetteAgents'}
                name={"Dette Agents"}
                dispatchName={'addCaseAgents'}
            />
            <AllDebtComp 
                loading = {loading || pLoading} 
                error={error} 
                pError={pError}
                debtName={'clients'}
                totalDetailDebtName={'detailTotDetteClients'}
                name={"Dette Clients"}
                dispatchName={'addCaseClients'}
            />
            <AllDebtComp 
                loading = {loading || pLoading} 
                error={error} 
                pError={pError}
                debtName={'musiciens'}
                totalDetailDebtName={'detailTotDetteMusiciens'}
                name={"Dette Musiciens"}
                dispatchName={'addCaseMusiciens'}
            />
            <TotDetteDaily day = {day} month = {month} year = {year}  error={error} pError={pError}/>
            <AllDebtComp 
                loading = {loading || pLoading} 
                error={error} 
                pError={pError}
                debtName={'fournisseurs'}
                totalDetailDebtName={'detailTotDetteFournisseurs'}
                name={"Mes Dettes"}
                dispatchName={'addCaseFournisseurs'}
            />
            <YourTotDetteDaily day = {day} month = {month} year = {year} />
            {!update ? <button className="px-5 py-1 bg-indigo-500 text-gray-100 rounded-md " onClick={postData}> Enregistrer les données</button> : <button className="px-5 py-1 bg-indigo-500 text-gray-100 rounded-md " onClick={updateData}> Mettre à les données</button> }

        </div>);
    };
}
