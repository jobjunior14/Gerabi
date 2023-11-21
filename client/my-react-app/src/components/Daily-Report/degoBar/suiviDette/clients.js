import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../../store/suiviDette-slice";
import { useId } from "react";

export default function Clients (){

    const dispatch = useDispatch();

    const clientsData = useSelector (state => state.suiviDette.clients);
    const readOnly = useSelector (state => state.suiviDette.readOnly);
    const totalDetteAndPaymentClients = useSelector (state => state.suiviDette.detailTotDetteClients);
    const id = useId ();

    const dataDisplay = [];
    let totalDetteClients = 0;


   if (clientsData && totalDetteAndPaymentClients) {
        for (let i = 0; i < clientsData.length; i++) {

            dataDisplay.push(<tr key={`trClient${i}$`}>
                <th>
                    <input
                        defaultValue={clientsData[i].name}
                        id = {clientsData[i].index + id + 'nameClients'}
                        type = 'text'
                        name = 'name'
                        readOnly = {readOnly}
                        placeholder="Taper le nom "
                        onChange={ (e) => {
                            const {name, value} = e.target;
                            dispatch(suiviDetteActions.HandleClients({name: name, value: value, index: clientsData[i].index}));
                        }}
                    />
                </th>
                <td>
                    <input
                        defaultValue={clientsData[i].data.amount}
                        id = {clientsData[i].index + id + 'amountClient'}
                        type = 'number'
                        name = 'amount'
                        placeholder="Taper le montant de la dette"
                        onChange={ (e) => {
                            const {name, value} = e.target;
                            dispatch(suiviDetteActions.HandleClients({name: name, value: Number(value), index: clientsData[i].index}));
                        }}
                    />
                </td>
                <td>
                    <input
                        defaultValue={clientsData[i].data.payment}
                        id = {clientsData[i].index + id + 'paymentClient'}
                        type = 'number'
                        name = 'payment'
                        placeholder="Taper le montant payé"
                        onChange={ (e) => {
                            const {name, value} = e.target;
                            dispatch(suiviDetteActions.HandleClients({name: name, value: Number(value), index: clientsData[i].index}));
                        }}
                    />
                </td>
                <td> {totalDetteAndPaymentClients[i].valeurDette - totalDetteAndPaymentClients[i].valeurPayment}</td>
            </tr>)

            //total Dette clients
            totalDetteClients += clientsData[i].data.amount;
        };
   };

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
                        {dataDisplay}
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
                    <h3> Dette Clients </h3>
                    <button onClick={() => dispatch(suiviDetteActions.addCaseClients())}> Ajouter Un Nom</button>
                    <h4> Ooouups!!! cette date n'a pas des données </h4>
                </div>
            );
        };
   } else {
    return (
        <h4> Chargement... </h4>
    );
   }
}
