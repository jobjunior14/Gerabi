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

            dataDisplay.push(<tr>
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
                        name = 'name'
                        placeholder="Taper le montant de la dette"
                        onChange={ (e) => {
                            const {name, value} = e.target;
                            dispacth(suiviDetteActions.HandleClients({name: name, value: value, index: i.index}));
                        }}
                    />
                </td>
            </tr>)

            //total Dette Agents
            totalDetteClients += i.data.amount;
        };
   };

   if (clientsData) {
        if (clientsData.length > 0) {

            return (<div>
                <h3> Dette Agents </h3>
                <table>
                    <thead>
                        <th>Nom</th>
                        <th>Montant</th>
                    </thead>
                    <tbody>
                        {dataDisplay}
                    </tbody>
                    <tfoot>
                        <th>Total</th>
                        <td> {totalDetteClients} </td>
                    </tfoot>
                </table>
                <button onClick={() => dispacth(suiviDetteActions.addCaseClients())}> Ajouter Un Nom</button>
            </div>)
        } else {
            <div>
                <button onClick={() => dispacth(suiviDetteActions.addCaseClients())}> Ajouter Un Nom</button>
                <h4> Ooouups!!! cette date n'a pas des données </h4>
            </div>
        };
   } else {
    <h4> Chargement... </h4>
   }
}
