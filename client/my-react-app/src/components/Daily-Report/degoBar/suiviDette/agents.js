import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../../store/suiviDette-slice";

export default function Agents (){

    const dispatch = useDispatch();

    const agentsData = useSelector (state => state.suiviDette.agents);
    const readOnly = useSelector (state => state.suiviDette.readOnly);
    const totalDetteAndPaymentAgent = useSelector(state => state.suiviDette.detailTotDetteAgents);

    const dataDisplay = [];
    let totalDetteAgent = 0;
    // console.log (totalDetteAndPaymentAgent);

   if (agentsData && totalDetteAndPaymentAgent) {

        for (let i = 0; i < agentsData.length; i++) {

            dataDisplay.push(<tr key={`trAgent${i}$`}>
                <th key={`thname${i}`}>
                    <input
                        defaultValue={agentsData[i].name}
                        id = {agentsData[i].index}
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
                        defaultValue={agentsData[i].data.amount}
                        id = {agentsData[i].index}
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
                        defaultValue={agentsData[i].data.payment}
                        id = {agentsData[i].index}
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
            totalDetteAgent += agentsData[i].data.amount;
        };
   };

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
