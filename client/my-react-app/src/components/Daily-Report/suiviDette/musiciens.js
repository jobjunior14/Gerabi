import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../store/suiviDette-slice";

export default function Musiciens (){

    const dispacth = useDispatch();

    const musiciensData = useSelector (state => state.suiviDette.musiciens);
    const readOnly = useSelector (state => state.suiviDette.readOnly);
    const totalDetteAndPaymentMusiciens = useSelector (state => state.suiviDette.detailTotDetteMusiciens);
    const dataDisplay = [];
    let totalDetteMusiciens = 0;


   if (musiciensData) {
        for (let i = 0; i < musiciensData.length; i++) {
            dataDisplay.push(<tr key={`trmusiciens${i}$`}>
                <th>
                    <input
                        defaultValue={musiciensData[i].name}
                        id = {musiciensData[i].index}
                        type = 'text'
                        name = 'name'
                        readOnly = {readOnly}
                        placeholder="Taper le nom "
                        onChange={ (e) => {
                            const {name, value} = e.target;
                            dispacth(suiviDetteActions.HandleMusiciens({name: name, value: value, index: musiciensData[i].index}));
                        }}
                    />
                </th>
                <td>
                    <input
                        defaultValue={musiciensData[i].data.amount}
                        id = {musiciensData[i].index}
                        type = 'number'
                        name = 'amount'
                        placeholder="Taper le montant de la dette"
                        onChange={ (e) => {
                            const {name, value} = e.target;
                            dispacth(suiviDetteActions.HandleMusiciens({name: name, value: Number (value), index: musiciensData[i].index}));
                        }}
                    />
                </td>
                <td>
                    <input
                        defaultValue={musiciensData[i].data.payment}
                        id = {musiciensData[i].index}
                        type = 'number'
                        name = 'payment'
                        placeholder="Taper le montant payé"
                        onChange={ (e) => {
                            const {name, value} = e.target;
                            dispacth(suiviDetteActions.HandleMusiciens({name: name, value: Number (value), index: musiciensData[i].index}));
                        }}
                    />
                </td>
                <td> {totalDetteAndPaymentMusiciens[i].valeurDette - totalDetteAndPaymentMusiciens[i].valeurPayment} </td>
            </tr>)

            //total Dette Agents
            totalDetteMusiciens += musiciensData[i].data.amount;
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
                            <th>Montant Dette</th>
                            <th>Montant Payé</th>
                            <th> Total Dette </th>
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
