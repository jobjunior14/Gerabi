import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { mensRapportActions } from "../../store/mensRepport-slice";

export default function VenteBar ({venteDego}) {

    const dispatch = useDispatch()
    //data
    const data = useSelector(state => state.mensRapport.suiviVente);

    
    if (data.bralima && data.brasimba && data.autreProduit ) {

        if ( data.bralima.length > 0 && data.brasimba.length > 0 && data.autreProduit.length > 0 ) {

            const totalVenteSysteme = data.bralima[0].vente_bar + data.brasimba[0].vente_bar + data.autreProduit[0].vente_bar;
            const pertes = totalVenteSysteme - venteDego;
            dispatch(mensRapportActions.setPerte(pertes));

            return (<div> 

                <h3> VENTE BAR</h3>
                <table>
                    <thead>
                        <tr>
                            <th> Libelé </th>
                            <th> Montant </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> Bralima </td>
                            <td> {data.bralima[0].vente_bar}</td>
                        </tr>
                        <tr>
                            <td> Brasimba </td>
                            <td> {data.brasimba[0].vente_bar}</td>
                        </tr>
                        <tr>
                            <td> Autre Produit </td>
                            <td> {data.autreProduit[0].vente_bar}</td>
                        </tr>
                        <tr>
                            <td> Total Vente Sytème </td>
                            <td> {totalVenteSysteme}</td>
                        </tr>
                        <tr>
                            <td> Vente Dego </td>
                            <td> {venteDego}</td>
                        </tr>
                        <tr>
                            <td> Pertes </td>
                            <td> {pertes}</td>
                        </tr>
                    </tbody>
                </table>

            </div>)
        } else {

            return (<div>
                <h3> VENTE BAR</h3>
                <h4>Ouuppss!! cette date n'a pas des donnees</h4>
            </div>);
        }

    } else {
        return (<div>
            <h3> VENTE BAR</h3>
            <h4> Chargement...</h4>
        </div>)
    };

}