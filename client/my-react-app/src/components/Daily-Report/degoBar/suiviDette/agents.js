import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../../store/suiviDette-slice";
import { useId } from "react";

export default function Agents (){

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
        let savedataDisplay = [];
        if (agentsData && totalDetteAndPaymentAgent) {
     
             for (let i = 0; i < agentsData.length; i++) {
     
                savedataDisplay.push(<tr key={`trAgent${i}$`}>
                     <th key={`thname${i}`}>
                         <input
                             value={agentsData[i].name}
                             id = {agentsData[i].index + id + 'nameAgent'}
                             type = 'text'
                             name = 'name'
                             readOnly = {readOnly}
                             placeholder="Taper le nom "
                             onChange={ (e) => {
                                 const {name, value} = e.target;
                                 dispatch(suiviDetteActions.HandleAgents({name: name, value: value, index: agentsData[i].index}));
                             }}
                         />
                     </th>
                     <td key={`tdAmount${i}`}>
                         <input
                             value={agentsData[i].data.amount}
                             id = {agentsData[i].index + id + 'amountAgent'}
                             type = 'number'
                             name = 'amount'
                             placeholder="Taper le montant de la dette"
                             onChange={ (e) => {
                                 const {name, value} = e.target;
                                 dispatch(suiviDetteActions.HandleAgents({name: name, value: Number (value), index: agentsData[i].index}));
                             }}
                         />
                     </td>
                     <td key={`tdpayment${i}`}>
                         <input
                             value={agentsData[i].data.payment}
                             id = {agentsData[i].index + id + 'paymentAgent'}
                             type = 'number'
                             name = 'payment'
                             placeholder="Taper le montant payé"
                             onChange={ (e) => {
                                 const {name, value} = e.target;
                                 dispatch(suiviDetteActions.HandleAgents({name: name, value: Number (value), index: agentsData[i].index}));
                             }}
                         />
                     </td>
                     <td> { (totalDetteAndPaymentAgent[i].valeurDette ) - ( totalDetteAndPaymentAgent[i].valeurPayment )}  </td>
                 </tr>)
     
                //total Dette Agents
                savetotalDetteAgent += agentsData[i].data.amount;
            };
        };
        //set the total Dette agent
        setTotalDetteAgent(prev => prev = savetotalDetteAgent);
        //set the array of agents (JSX elements)
        setDataDisplay (prev => prev = savedataDisplay);
    }, [agentsData, readOnly, totalDetteAndPaymentAgent]);

   //set total Dette Agents

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
