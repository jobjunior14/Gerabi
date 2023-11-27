import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../../store/suiviDette-slice";
import { useId } from "react";
import { indexMatcher } from "../../../reuseFunction/suividette/indexMatch";

export default function Agents ({toot}){

    const dispatch = useDispatch();

    const id = useId();
    const agentsData = useSelector (state => state.suiviDette.agents);
    const readOnly = useSelector (state => state.suiviDette.readOnly);
    const totalDetteAndPaymentAgent = useSelector(state => state.suiviDette.detailTotDetteAgents);
    const [totalDetteAgent, setTotalDetteAgent] = useState (0);
    const [dataDisplay, setDataDisplay] = useState ([]);

    //side effect
    useEffect (() => {

        let savetotalDetteAgent = 0;
        
        if (agentsData && totalDetteAndPaymentAgent && (agentsData.length === totalDetteAndPaymentAgent.length)) {
            
            const saveTotalDetteAndPaymentAgent = indexMatcher(agentsData, totalDetteAndPaymentAgent);
            // //match the index in the totalDetteAndPaymentAgent array and agentsData
            // for (let i = 0; i < agentsData.length; i++) {
            //     const index1 = agentsData.findIndex(el => el.name === agentsData[i].name);
            //     const index2 = agentsData.findIndex(el => el.name === saveTotalDetteAndPaymentAgent[i]._id);

            //     let save = null;
            //     if (!(index1 === index2)) {
            //         save = saveTotalDetteAndPaymentAgent[index2];
            //         saveTotalDetteAndPaymentAgent[index2] = saveTotalDetteAndPaymentAgent[index1];
            //         saveTotalDetteAndPaymentAgent[index1] = save;
            //     };
            // };

            //set the total Dette agent
            setDataDisplay( agentsData.map((el, i) =>  {
                
                savetotalDetteAgent += el.data.amount;
                return (
                    <tr key={`trAgent${i}$`}>
                        <th key={`thname${i}`}>
                         <input
                            value = {el.name}
                            id = {el.index + id + 'nameAgent'}
                            type = 'text'
                            name = 'name'
                            readOnly = {readOnly}
                            placeholder="Taper le nom "
                            onChange={ (e) => {
                                const {name, value} = e.target;
                                dispatch(suiviDetteActions.HandleAgents({name: name, value: value, index: el.index}));
                            }}
                        />
                    </th>
                    <td key={`tdAmount${i}`}>
                        <input
                            value={el.data.amount}
                            id = {el.index + id + 'amountAgent'}
                            type = 'number'
                            name = 'amount'
                            placeholder="Taper le montant de la dette"
                            onChange={ (e) => {
                                const {name, value} = e.target;
                                dispatch(suiviDetteActions.HandleAgents({name: name, value: Number (value), index: el.index}));
                            }}
                        />
                    </td>
                    <td key={`tdpayment${i}`}>
                        <input
                            value={el.data.payment}
                            id = {el.index + id + 'paymentAgent'}
                            type = 'number'
                            name = 'payment'
                            placeholder="Taper le montant payé"
                            onChange={ (e) => {
                                const {name, value} = e.target;
                                dispatch(suiviDetteActions.HandleAgents({name: name, value: Number (value), index: el.index}));
                            }}
                        />
                    </td>
                    <td> {saveTotalDetteAndPaymentAgent[i].valeurDette - saveTotalDetteAndPaymentAgent[i].valeurPayment }</td>
                </tr>
                )
            }));
    
            //set the array of tot daily debt agents (JSX elements)
            setTotalDetteAgent (savetotalDetteAgent);
        };

    }, [agentsData, readOnly, totalDetteAndPaymentAgent]);

   if (agentsData) {
        if (agentsData.length > 0) {

            return (<div>
                <h3> Dette Agents </h3>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Montant</th>
                            <th>Montant Payé</th>
                            <th>Total Dette</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataDisplay}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <td> {totalDetteAgent} </td>
                        </tr>
                    </tfoot>
                </table>
                {!readOnly && <button onClick={() => dispatch(suiviDetteActions.addCaseAgents())}> Ajouter Un Nom</button>}
            </div>)
        } else {
            return (
                <div>
                    <h3> Dette Agents </h3>
                    <button onClick={() => dispatch(suiviDetteActions.addCaseAgents())}> Ajouter Un Nom</button>
                    <h4> Ooouups!!! cette date n'a pas des données </h4>
                </div>
            );
        };
   } else {
    return (
        <h4> Chargement... </h4>
    );
   };
}
