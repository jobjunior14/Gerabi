import React, {useEffect, useState, useCallback} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../../store/suiviDette-slice";
import { useId } from "react";
import { indexMatcher } from "../../../reuseFunction/suividette/indexMatch";

export default function Agents (){

    const dispatch = useDispatch();

    const id = useId();
    const agentsData = useSelector (state => state.suiviDette.agents);
    const readOnly = useSelector (state => state.suiviDette.readOnly);
    const totalDetteAndPaymentAgent = useSelector(state => state.suiviDette.detailTotDetteAgents);
    const [totalDetteAgent, setTotalDetteAgent] = useState (0);
    const [savetotalDetteAndPaymentAgents, setSavetotalDetteAndPaymentAgents] = useState(0);

    //side effect
    useEffect (() => {
        let savetotalDetteAgent = 0;
        if (agentsData && totalDetteAndPaymentAgent) {

            //await data from the aerver to display the calculation of total debt to not getting error in the indexmacher function
            if (agentsData.length > 0 && agentsData.length === totalDetteAndPaymentAgent.length) {
                
                setSavetotalDetteAndPaymentAgents(indexMatcher(agentsData, totalDetteAndPaymentAgent));
            };
            for (let i = 0; i < agentsData.length; i++) {
                //total Dette Agents
                savetotalDetteAgent += agentsData[i].data.amount;
            };
        };
        //set the total Dette agent
        setTotalDetteAgent(prev => prev = savetotalDetteAgent);
    }, [agentsData, totalDetteAndPaymentAgent]);

    //side effect
    const renderDataDisplay = useCallback(() => {
        if (agentsData && totalDetteAndPaymentAgent) {
            return agentsData.map((el, i) =>  {
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
                    <td> { savetotalDetteAndPaymentAgents ? savetotalDetteAndPaymentAgents[i].valeurDette - savetotalDetteAndPaymentAgents[i].valeurPayment : 0 }</td>
                </tr>
                )
            });
        }
    }, [agentsData,readOnly, savetotalDetteAndPaymentAgents]);

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
                        {renderDataDisplay()}
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
