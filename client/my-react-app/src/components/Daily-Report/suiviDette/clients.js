import React, {useEffect, useState, useCallback} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../store/suiviDette-slice";
import { useId } from "react";
import { indexMatcher } from "../../reuseFunction/suividette/indexMatch";
import DebtDisplay from "./components/dispalyDebtComp";

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
                     <DebtDisplay 
                        key = {`clients:${i}`}
                        {...el}
                        id = {id}
                        tr = {`trclients:${i}`}
                        readOnly = {readOnly}
                        in1 = 'nameclients'
                        in2 = 'amountclients'
                        in3 = 'paymentclients'
                        component = 'clients'
                        totDebt = {savetotalDetteAndPaymentClients ? savetotalDetteAndPaymentClients[i].valeurDette - savetotalDetteAndPaymentClients[i].valeurPayment : 0 }
                    />
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
