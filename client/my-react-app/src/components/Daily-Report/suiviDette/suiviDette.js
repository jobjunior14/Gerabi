import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { suiviDetteActions } from "../../store/suiviDette-slice";
import { useSearchParams } from "react-router-dom";
import DailyFilter from "../../filter/filterDailyRap";
import Clients from "./clients"
import Musiciens from "./musiciens";
import Agents from "./agents";
import TotDetteDaily from "./totalDetteDaily";

function deleteEmptyName (array) {
    const data = [];

    for (let i of array ) {

        if (i.name !== "" ){
            data.push(i);
        };
    };
    return data;
};

function postAndUpdate(dispacth, agents, musiciens, clients, year, month, day, update) {

    let newDataSuiviDette = null;
    let createdAt = `${year}-${month}-${day}T07:22:54.930Z`;

    //set date to the rigth format
    if ( month >= 10 && day >= 10){
       createdAt = `${year}-${month}-${day}T07:22:54.930Z`;
    } else if (month >= 10 && day < 10) {
        createdAt = `${year}-${month}-0${day}T07:22:54.930Z`;       
    } else if (month < 10 && day >= 10) {
        createdAt = `${year}-0${month}-${day}T07:22:54.930Z`;     
    } else {
        createdAt = `${year}-0${month}-0${day}T07:22:54.930Z`;
    };
    //modeling data to schema
    newDataSuiviDette = {
        data: {
            data:{
                agents: deleteEmptyName(agents).map(el => {return {...el, data:{...el.data, createdAt: createdAt, }}}),
                musiciens: deleteEmptyName(musiciens).map(el => {return {...el, data:{...el.data, createdAt: createdAt, }}}),
                clients: deleteEmptyName(clients).map(el => {return {...el, data:{...el.data, createdAt: createdAt, }}}),
            }
        }
    };

    try {

        const fecthData = async () => {
    
            dispacth(suiviDetteActions.setAgents(null));
            dispacth(suiviDetteActions.setClients(null));
            dispacth(suiviDetteActions.setMusiciens(null));
    
            const responseSuiviDette = !update ? await axios.post(`http://localhost:5001/api/v1/suiviDette/rapportJournalier?year=${year}&month=${month}&day=${day}`, newDataSuiviDette) : await axios.post(`http://localhost:5001/api/v1/suiviDette/rapportJournalier/${year}/${month}/${day}`, newDataSuiviDette);
    
    
                const totDetailDetteAndPayment = await axios.get (`http://localhost:5001/api/v1/suiviDette/rapportMensuel/detail/${year}/${month}`);
                //set the total amount debt and payment   
                dispacth(suiviDetteActions.setDetailTotDetteAgents(totDetailDetteAndPayment.data.data.agents));
                dispacth(suiviDetteActions.setDetailTotDetteMusiciens(totDetailDetteAndPayment.data.data.musiciens));
                dispacth(suiviDetteActions.setDetailTotDetteClients(totDetailDetteAndPayment.data.data.clients));
            
    
    
            dispacth(suiviDetteActions.setUpdate(true));
            dispacth(suiviDetteActions.setReadOnly(true));
            dispacth(suiviDetteActions.setAgents(responseSuiviDette.data.data.agents.map ((el, index) => {return {...el, index: index}})));
            dispacth(suiviDetteActions.setClients(responseSuiviDette.data.data.clients.map ((el, index) => {return {...el, index: index}})));
            dispacth(suiviDetteActions.setMusiciens(responseSuiviDette.data.data.musiciens.map ((el, index) => {return {...el, index: index}})));
            if (responseSuiviDette.data.data.totalDette) {
                
                dispacth (suiviDetteActions.setTotalDette(responseSuiviDette.data.data.totalDette));
            } else {
    
                dispacth (suiviDetteActions.setTotalDette(0));
            };
        }; fecthData();
        
    } catch (e) {
        console.log(e);
    }


};

export default function SuiviDette () {

    const dispacth = useDispatch ();
    //params
    const [dateParams, setDateParams] = useSearchParams();

    //date in fields
    const date = useSelector (state => state.suiviDepense.date);

    //dependacies of useEffect
    const year = Number(dateParams.get("year"));
    const month = Number(dateParams.get("month")); 
    const day = Number(dateParams.get("day"));

    //current date
    const currentYear = Number (new Date().getFullYear());
    const currentMonth = Number (new Date().getMonth() + 1);
    const currentDay = Number (new Date().getDate());
    //data 
    const agents = useSelector(state => state.suiviDette.agents);
    const clients = useSelector(state => state.suiviDette.clients);
    const musiciens = useSelector(state => state.suiviDette.musiciens);
    const update = useSelector(state => state.suiviDette.update);
    
    useEffect(() => {

        dispacth(suiviDetteActions.setAgents(null));
        dispacth(suiviDetteActions.setClients(null));
        dispacth(suiviDetteActions.setMusiciens(null));

        const fecthData = async () => {

            try {

                const suiviDetteData = await axios.get (`http://localhost:5001/api/v1/suiviDette/rapportJournalier/${year}/${month}/${day}`);
                const totDetailDetteAndPayment = await axios.get (`http://localhost:5001/api/v1/suiviDette/rapportMensuel/detail/${year}/${month}`);

                if (suiviDetteData.data.data.agents.length > 0 && suiviDetteData.data.data.musiciens.length > 0 && suiviDetteData.data.data.clients.length > 0 ){
                    
                    dispacth(suiviDetteActions.setUpdate(true));
                    dispacth(suiviDetteActions.setReadOnly(true));

                    dispacth(suiviDetteActions.setAgents(suiviDetteData.data.data.agents.map ((el, index) => {return {...el, index: index}})));
                    dispacth(suiviDetteActions.setClients(suiviDetteData.data.data.clients.map ((el, index) => {return {...el, index: index}})));
                    dispacth(suiviDetteActions.setMusiciens(suiviDetteData.data.data.musiciens.map ((el, index) => {return {...el, index: index}})));
                    //set the total amount debt and payment   
                    dispacth(suiviDetteActions.setDetailTotDetteAgents(totDetailDetteAndPayment.data.data.agents));
                    dispacth(suiviDetteActions.setDetailTotDetteMusiciens(totDetailDetteAndPayment.data.data.musiciens));
                    dispacth(suiviDetteActions.setDetailTotDetteClients(totDetailDetteAndPayment.data.data.clients));

                } else {
                    
                    dispacth(suiviDetteActions.setUpdate(false));
                    dispacth(suiviDetteActions.setReadOnly(false));
                    
                    const lastCreatedData = await axios.get(`http://localhost:5001/api/v1/suiviDette/lastElement/${year}/${month}`);
                    
                    
                    if (lastCreatedData.data.data) {
                        
                        //set the total amount debt and payment   
                        dispacth(suiviDetteActions.setDetailTotDetteAgents(totDetailDetteAndPayment.data.data.agents));
                        dispacth(suiviDetteActions.setDetailTotDetteMusiciens(totDetailDetteAndPayment.data.data.musiciens));
                        dispacth(suiviDetteActions.setDetailTotDetteClients(totDetailDetteAndPayment.data.data.clients));
                        
                        dispacth(suiviDetteActions.setAgents(lastCreatedData.data.data.agents.map((el, index) => {return {...el, index: index}})));
                        dispacth(suiviDetteActions.setMusiciens(lastCreatedData.data.data.musiciens.map((el, index) => {return {...el, index: index}})));
                        dispacth(suiviDetteActions.setClients(lastCreatedData.data.data.clients.map((el, index) => {return {...el, index: index}})));
                        dispacth(suiviDetteActions.setTotalDette(lastCreatedData.data.data.clients));
                        
                    } else {
                        
                        //set the total amount debt and payment   
                        dispacth(suiviDetteActions.setDetailTotDetteAgents([]));
                        dispacth(suiviDetteActions.setDetailTotDetteMusiciens([]));
                        dispacth(suiviDetteActions.setDetailTotDetteClients([]));

                        dispacth(suiviDetteActions.setAgents([]));
                        dispacth(suiviDetteActions.setClients([]));
                        dispacth(suiviDetteActions.setMusiciens([]));
                        dispacth(suiviDetteActions.setTotalDette(0));
                    };
                };

            } catch (e) {
                console.log (e);
            };
        }; fecthData();
    }, [year, month, day]);

    function setFilterParams() {

        setDateParams(prev => prev = date);
    };

    useEffect (() => {

        setDateParams (prev => prev = date);
    }, [year, month, day]);

    function postData () {

        postAndUpdate(dispacth, agents, musiciens, clients, year, month, day, false);
    };

    function updateData () {

        postAndUpdate(dispacth, agents, musiciens, clients, year, month, day, true);
    };

    //calculate the totad debt daily
    if ( agents && musiciens && clients && agents.length > 0 && musiciens.length > 0 && clients.length > 0 ) {
        let tot = 0;

        for (let i of agents) {
            if (i.name !== "" ) {
                tot += i.data.amount
            };
        };
        for (let i of musiciens) {
            if (i.name !== "" ) {
                tot += i.data.amount
            };
        };
        for (let i of clients) {
            if (i.name !== "" ) {
                tot += i.data.amount
            };
        };

        dispacth(suiviDetteActions.setTotalDette(tot));
    };

    if (year > currentYear && month > currentMonth && day > currentDay) {

        return (
            <div>
                <DailyFilter component = {'suiviDepense'} prev = {date} onclick = {setFilterParams} />
                <h1> Ooouups vous ne pouvez demander une donnee d'une date inexistante </h1>
            </div>
        );
    } else {

        return (<div>
            <DailyFilter component = {'suiviDette'}  prev = {date} onclick = {setFilterParams}/>
            <Agents/>
            <Clients/>
            <Musiciens/>
            <TotDetteDaily day = {day} month = {month} year = {year} />
            {!update ? <button onClick={postData}> Enregistrer les données</button> : <button onClick={updateData}> Mettre à les données</button> }

        </div>);
    }

}
