import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../store/suiviDette-slice";

export default function Agents (){

    const dispacth = useDispatch();

    const agentsData = useSelector (state => state.suiviDette.agents);
    const readOnly = useSelector (state => state.suiviDette.readOnly);

    const dataDisplay = [];
    let totalDetteAgent = 0;


   if (agentsData) {
        for (let i of agentsData) {

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
                            dispacth(suiviDetteActions.HandleAgents({name: name, value: value, index: i.index}));
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
                            dispacth(suiviDetteActions.HandleAgents({name: name, value: value, index: i.index}));
                        }}
                    />
                </td>
            </tr>)

            //total Dette Agents
            totalDetteAgent += i.data.amount;
        };
   };

   if (agentsData) {
        if (agentsData.length > 0) {

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
                    <tfoott>
                        <th>Total</th>
                        <td> {totalDetteAgent} </td>
                    </tfoott>
                </table>
                <button onClick={() => dispacth(suiviDetteActions.addCaseAgents())}> Ajouter Un Nom</button>
            </div>)
        } else {
            <div>
                <button onClick={() => dispacth(suiviDetteActions.addCaseAgents())}> Ajouter Un Nom</button>
                <h4> Ooouups!!! cette date n'a pas des données </h4>
            </div>
        };
   } else {
    <h4> Chargement... </h4>
   }
}
