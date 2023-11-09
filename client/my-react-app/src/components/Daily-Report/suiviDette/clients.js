import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../store/suiviDette-slice";

export default function Clients (){

    const dispacth = useDispatch();

    const clientsData = useSelector (state => state.suiviDette.clients);
    const readOnly = useSelector (state => state.suiviDette.readOnly);

    const dataDisplay = [];
    let totalDetteClients = 0;


   if (clientsData) {
        for (let i of clientsData) {

            dataDisplay.push(<tr key={`trClient${i}`}>
                <th>
                    <input
                        defaultValue={i.name}
                        id = {i.index}
                        type = 'text'
                        name = 'name'
                        readOnly = {readOnly}
                        placeholder="Taper le nom "
                        onChange={ (e) => {
                            const {name, value} = e.target;
                            dispacth(suiviDetteActions.HandleClients({name: name, value: value, index: i.index}));
                        }}
                    />
                </th>
                <td>
                    <input
                        defaultValue={i.data.amount}
                        id = {i.index}
                        type = 'number'
                        name = 'amount'
                        placeholder="Taper le montant de la dette"
                        onChange={ (e) => {
                            const {name, value} = e.target;
                            dispacth(suiviDetteActions.HandleClients({name: name, value: value, index: i.index}));
                        }}
                    />
                </td>
            </tr>)

            //total Dette clients
            totalDetteClients += i.data.amount;
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
                {!readOnly && <button onClick={() => dispacth(suiviDetteActions.addCaseClients())}> Ajouter Un Nom</button>}
            </div>)
        } else {
            return (
                <div>
                    <h3> Dette Clients </h3>
                    <button onClick={() => dispacth(suiviDetteActions.addCaseClients())}> Ajouter Un Nom</button>
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
