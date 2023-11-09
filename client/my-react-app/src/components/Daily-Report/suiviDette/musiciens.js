import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../store/suiviDette-slice";

export default function Musiciens (){

    const dispacth = useDispatch();

    const musiciensData = useSelector (state => state.suiviDette.musiciens);
    const readOnly = useSelector (state => state.suiviDette.readOnly);

    const dataDisplay = [];
    let totalDetteMusiciens = 0;


   if (musiciensData) {
        for (let i of musiciensData) {

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
                            dispacth(suiviDetteActions.HandleMusiciens({name: name, value: value, index: i.index}));
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
                            dispacth(suiviDetteActions.HandleMusiciens({name: name, value: value, index: i.index}));
                        }}
                    />
                </td>
            </tr>)

            //total Dette Agents
            totalDetteMusiciens += i.data.amount;
        };
   };

   if (musiciensData) {
        if (musiciensData.length > 0) {

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
                        <td> {totalDetteMusiciens} </td>
                    </tfoott>
                </table>
                <button onClick={() => dispacth(suiviDetteActions.addCaseMusiciens())}> Ajouter Un Nom</button>
            </div>)
        } else {
            <div>
                <button onClick={() => dispacth(suiviDetteActions.addCaseMusiciens())}> Ajouter Un Nom</button>
                <h4> Ooouups!!! cette date n'a pas des données </h4>
            </div>
        };
   } else {
    <h4> Chargement... </h4>
   }
}
