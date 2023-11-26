import {useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { suiviDetteActions } from "../../../store/suiviDette-slice";
import { useEffect } from "react";

export default function TotDetteDaily (props) {

    const totDette = useSelector(state => state.suiviDette.totalDette);
    const dispatch = useDispatch();
    //data 
    const agents = useSelector(state => state.suiviDette.agents);
    const clients = useSelector(state => state.suiviDette.clients);
    const musiciens = useSelector(state => state.suiviDette.musiciens);

    //side effect
    useEffect(() => {
        //calculate the totad debt daily
        if ( agents && musiciens && clients && agents.length > 0 && musiciens.length > 0 && clients.length > 0 ) {
            let tot = 0;
    
            for (let i of agents) {
                if (i.name !== "" ) {
                    tot += i.data.amount - i.data.payment;
                };
            };
            for (let i of musiciens) {
                if (i.name !== "" ) {
                    tot += i.data.amount - i.data.payment;
                };
            };
            for (let i of clients) {
                if (i.name !== "" ) {
                    tot += i.data.amount - i.data.payment;
                };
            };
    
            dispatch(suiviDetteActions.setTotalDette(tot));
        };

    }, [agents, clients, musiciens]);

    return (<p> Total dette du {props.day}-{props.month}-{props.year} : <b> {totDette} </b> </p>)
};