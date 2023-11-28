import React, {useEffect, useState, useCallback} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../../store/suiviDette-slice";
import { useId } from "react";
import { indexMatcher } from "../../../reuseFunction/suividette/indexMatch";

export default function Clients (){

    const dispatch = useDispatch();

    const id = useId();
    const clientsData = useSelector (state => state.suiviDette.clients);
    const readOnly = useSelector (state => state.suiviDette.readOnly);
    const totalDetteAndPaymentClients = useSelector(state => state.suiviDette.detailTotDetteClients);
    const [totalDetteClients, setTotalDetteClients] = useState (0);
    const [savetotalDetteAndPaymentClients, setSavetotalDetteAndPaymentClients] = useState(0);

    //side effect
    useEffect (() => {
        let savetotalDetteClients = 0;
        if (clientsData && totalDetteAndPaymentClients) {

            //await data from the aerver to display the calculation of total debt to not getting error in the indexmacher function
            if (clientsData.length > 0 && clientsData.length === totalDetteAndPaymentClients.length) {
                
                setSavetotalDetteAndPaymentClients(indexMatcher(clientsData, totalDetteAndPaymentClients));
            };
            for (let i = 0; i < clientsData.length; i++) {
                //total Dette Agents
                savetotalDetteClients += clientsData[i].data.amount;
            };
        };
        //set the total Dette agent
        setTotalDetteClients(prev => prev = savetotalDetteClients);
    }, [clientsData, totalDetteAndPaymentClients]);

    //side effect
    const renderDataDisplay = useCallback(() => {
        if (clientsData && totalDetteAndPaymentClients) {
            return clientsData.map((el, i) =>  {
                return (
                    <tr key={`trClients${i}$`}>
                        <th key={`thname${i}`}>
                         <input
                            value = {el.name}
                            id = {el.index + id + 'nameClients'}
                            type = 'text'
                            name = 'name'
                            readOnly = {readOnly}
                            placeholder="Taper le nom "
                            onChange={ (e) => {
                                const {name, value} = e.target;
                                dispatch(suiviDetteActions.HandleClients({name: name, value: value, index: el.index}));
                            }}
                        />
                    </th>
                    <td key={`tdAmount${i}`}>
                        <input
                            value={el.data.amount}
                            id = {el.index + id + 'amountClients'}
                            type = 'number'
                            name = 'amount'
                            placeholder="Taper le montant de la dette"
                            onChange={ (e) => {
                                const {name, value} = e.target;
                                dispatch(suiviDetteActions.HandleClients({name: name, value: Number (value), index: el.index}));
                            }}
                        />
                    </td>
                    <td key={`tdpayment${i}`}>
                        <input
                            value={el.data.payment}
                            id = {el.index + id + 'paymentCliens'}
                            type = 'number'
                            name = 'payment'
                            placeholder="Taper le montant payé"
                            onChange={ (e) => {
                                const {name, value} = e.target;
                                dispatch(suiviDetteActions.HandleClients({name: name, value: Number (value), index: el.index}));
                            }}
                        />
                    </td>
                    <td> { savetotalDetteAndPaymentClients ? savetotalDetteAndPaymentClients[i].valeurDette - savetotalDetteAndPaymentClients[i].valeurPayment : 0 }</td>
                </tr>
                )
            });
        }
    }, [clientsData,readOnly, savetotalDetteAndPaymentClients]);

   if (clientsData) {
        if (clientsData.length > 0) {

            return (<div>
                <h3> Dette Clients </h3>
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
                            <td> {totalDetteClients} </td>
                        </tr>
                    </tfoot>
                </table>
                {!readOnly && <button onClick={() => dispatch(suiviDetteActions.addCaseClients())}> Ajouter Un Nom</button>}
            </div>)
        } else {
            return (
                <div>
                    <h3> Dette Agents </h3>
                    <button onClick={() => dispatch(suiviDetteActions.addCaseClients())}> Ajouter Un Nom</button>
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
