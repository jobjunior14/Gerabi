import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { suiviDetteActions } from "../../../store/suiviDette-slice";
import { useSearchParams } from "react-router-dom";
import DailyFilter from "../../../filter/filterDailyRap";
import Clients from "./clients"
import Musiciens from "./musiciens";
import Agents from "./agents";
import TotDetteDaily from "./totalDetteDaily";
import formatDate from "../../../reuseFunction/suiviStockVente/rightFormatDate";

function deleteEmptyName (array) {
    const data = [];

    for (let i of array ) {

        if (i.name !== "" ){
            data.push(i);
        };
    };
    return data;
};

function postAndUpdate(dispatch, agents, musiciens, clients, year, month, day, update, props) {

    let newDataSuiviDette = null;
    let createdAt = formatDate(year, month, day);

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
    
            dispatch(suiviDetteActions.setAgents(null));
            dispatch(suiviDetteActions.setClients(null));
            dispatch(suiviDetteActions.setMusiciens(null));
    
            const responseSuiviDette = !update ? await axios.post(`http://localhost:5001/api/v1/${props.componentName}/suiviDette/rapportJournalier?year=${year}&month=${month}&day=${day}`, newDataSuiviDette) : await axios.post(`http://localhost:5001/api/v1/${props.componentName}/suiviDette/rapportJournalier/${year}/${month}/${day}`, newDataSuiviDette);
    
    
                const totDetailDetteAndPayment = await axios.get (`http://localhost:5001/api/v1/${props.componentName}/suiviDette/rapportMensuel/detail/${year}/${month}`);
                //set the total amount debt and payment  
                dispatch(suiviDetteActions.setDetailTotDetteAgents(totDetailDetteAndPayment.data.data.agents));
                dispatch(suiviDetteActions.setDetailTotDetteMusiciens(totDetailDetteAndPayment.data.data.musiciens));
                dispatch(suiviDetteActions.setDetailTotDetteClients(totDetailDetteAndPayment.data.data.clients));
                
            dispatch(suiviDetteActions.setUpdate(true));
            dispatch(suiviDetteActions.setReadOnly(true));
            dispatch(suiviDetteActions.setAgents(responseSuiviDette.data.data.agents.map ((el, index) => {return {...el, index: index}})));
            dispatch(suiviDetteActions.setClients(responseSuiviDette.data.data.clients.map ((el, index) => {return {...el, index: index}})));
            dispatch(suiviDetteActions.setMusiciens(responseSuiviDette.data.data.musiciens.map ((el, index) => {return {...el, index: index}})));
            if (responseSuiviDette.data.data.totalDette) {
                dispatch (suiviDetteActions.setTotalDette(responseSuiviDette.data.data.totalDette));
            } else {
    
                dispatch (suiviDetteActions.setTotalDette(0));
            };
        }; fecthData();
        
    } catch (e) {
        console.log(e);
    };
};

export default function SuiviDette (props) {

    const dispatch = useDispatch ();
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
    
    const update = useSelector(state => state.suiviDette.update);
    //data 
    const agents = useSelector(state => state.suiviDette.agents);
    const clients = useSelector(state => state.suiviDette.clients);
    const musiciens = useSelector(state => state.suiviDette.musiciens);

    useEffect(() => {

        dispatch(suiviDetteActions.setAgents(null));
        dispatch(suiviDetteActions.setClients(null));
        dispatch(suiviDetteActions.setMusiciens(null));

        const fecthData = async () => {

            try {

                const suiviDetteData = await axios.get (`http://localhost:5001/api/v1/${props.componentName}/suiviDette/rapportJournalier/${year}/${month}/${day}`);
                const totDetailDetteAndPayment = await axios.get (`http://localhost:5001/api/v1/${props.componentName}/suiviDette/rapportMensuel/detail/${year}/${month}`);

                if (suiviDetteData.data.data.agents.length > 0 && suiviDetteData.data.data.musiciens.length > 0 && suiviDetteData.data.data.clients.length > 0 ){
                    
                    dispatch(suiviDetteActions.setUpdate(true));
                    dispatch(suiviDetteActions.setReadOnly(true));

                    dispatch(suiviDetteActions.setAgents(suiviDetteData.data.data.agents.map ((el, index) => {return {...el, index: index}})));
                    dispatch(suiviDetteActions.setClients(suiviDetteData.data.data.clients.map ((el, index) => {return {...el, index: index}})));
                    dispatch(suiviDetteActions.setMusiciens(suiviDetteData.data.data.musiciens.map ((el, index) => {return {...el, index: index}})));
                    //set the total amount debt and payment 
                    dispatch(suiviDetteActions.setDetailTotDetteAgents(totDetailDetteAndPayment.data.data.agents)); 
                    dispatch(suiviDetteActions.setDetailTotDetteMusiciens(totDetailDetteAndPayment.data.data.musiciens));
                    dispatch(suiviDetteActions.setDetailTotDetteClients(totDetailDetteAndPayment.data.data.clients));

                } else {
                    
                    dispatch(suiviDetteActions.setUpdate(false));
                    dispatch(suiviDetteActions.setReadOnly(false));
                    
                    const lastCreatedData = await axios.get(`http://localhost:5001/api/v1/${props.componentName}/suiviDette/lastElement/${year}/${month}`);
                    
                    
                    if (lastCreatedData.data.data) {
                        
                        //set the total amount debt and payment   
                        dispatch(suiviDetteActions.setDetailTotDetteAgents(totDetailDetteAndPayment.data.data.agents));
                        dispatch(suiviDetteActions.setDetailTotDetteMusiciens(totDetailDetteAndPayment.data.data.musiciens));
                        dispatch(suiviDetteActions.setDetailTotDetteClients(totDetailDetteAndPayment.data.data.clients));
                        
                        dispatch(suiviDetteActions.setAgents(lastCreatedData.data.data.agents.map((el, index) => {return {...el, index: index}})));
                        dispatch(suiviDetteActions.setMusiciens(lastCreatedData.data.data.musiciens.map((el, index) => {return {...el, index: index}})));
                        dispatch(suiviDetteActions.setClients(lastCreatedData.data.data.clients.map((el, index) => {return {...el, index: index}})));
                        dispatch(suiviDetteActions.setTotalDette(lastCreatedData.data.data.totalDette));
                        
                    } else {
                        
                        //set the total amount debt and payment   
                        dispatch(suiviDetteActions.setDetailTotDetteAgents([]));
                        dispatch(suiviDetteActions.setDetailTotDetteMusiciens([]));
                        dispatch(suiviDetteActions.setDetailTotDetteClients([]));

                        dispatch(suiviDetteActions.setAgents([]));
                        dispatch(suiviDetteActions.setClients([]));
                        dispatch(suiviDetteActions.setMusiciens([]));
                        dispatch(suiviDetteActions.setTotalDette(0));
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

        postAndUpdate(dispatch, agents, musiciens, clients, year, month, day, false, props);
    };

    function updateData () {

        postAndUpdate(dispatch, agents, musiciens, clients, year, month, day, true, props);
    };

    const totalDetteAndPaymentAgent = useSelector(state => state.suiviDette.detailTotDetteAgents);


    if (year > currentYear && month > currentMonth && day > currentDay) {

        return (
            <div>
                <DailyFilter component = {'suiviDette'} prev = {date} onclick = {setFilterParams} />
                <h1> Ooouups vous ne pouvez demander une donnee d'une date inexistante </h1>
            </div>
        );
    } else {

        return (<div>
            <DailyFilter component = {'suiviDette'}  prev = {date} onclick = {setFilterParams}/>
            <Agents toot = {totalDetteAndPaymentAgent}/>
            <Clients/>
            <Musiciens/>
            <TotDetteDaily day = {day} month = {month} year = {year} />
            {!update ? <button onClick={postData}> Enregistrer les données</button> : <button onClick={updateData}> Mettre à les données</button> }

        </div>);
    }

}
