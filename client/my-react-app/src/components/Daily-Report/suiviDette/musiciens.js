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

            dataDisplay.push(<tr key={`trmusiciens${i}`}>
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
                        name = 'amount'
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
                <h3> Dette Musiciens </h3>
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
                            <td> {totalDetteMusiciens} </td>
                        </tr>
                    </tfoot>
                </table>
                {!readOnly && <button onClick={() => dispacth(suiviDetteActions.addCaseMusiciens())}> Ajouter Un Nom</button>}
            </div>)
        } else {
            return (
                <div>
                    <h3> Dette Musiciens </h3>
                    <button onClick={() => dispacth(suiviDetteActions.addCaseMusiciens())}> Ajouter Un Nom</button>
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
