import React from "react";
import { useSelector } from "react-redux";

export default function Benefice () {

    //data
    const data = useSelector(state => state.venteBar.mensualData);
    
    if (data && data.bralima && data.brasimba && data.autreProduit && data.liqueurs ) {

        const total = data.bralima.benefice + data.brasimba.benefice + data.autreProduit.benefice + data.liqueurs.benefice;

        return (<div> 

            <h3> BENEFICE </h3>
            <p> </p>
            <table>

                <tr>
                    <th> Libelé </th>
                    <th> Montant </th>
                </tr>
                <tr>
                    <td> Bralima </td>
                    <td> {data.bralima.benefice}</td>
                </tr>
                <tr>
                    <td> Brasimba </td>
                    <td> {data.brasimba.benefice}</td>
                </tr>
                <tr>
                    <td> Autre Produit </td>
                    <td> {data.autreProduit.benefice}</td>
                </tr>
                <tr>
                    <td> Liqueurs </td>
                    <td> {data.liqueurs.benefice}</td>
                </tr>
                <tr>
                    <td> Total </td>
                    <td> {total}</td>
                </tr>
                <tr>
                    <td>  </td>
                    <td> </td>
                </tr>
                <tr>
                    <td> Pertes </td>
                    <td> doit etre reviser </td>
                </tr>
                <tr>
                    <td> Dépenses éffectuées  </td>
                    <td> doit etre reviser</td>
                </tr>
                <tr>
                    <td>Benefice net  </td>
                    <td> doit etre reviser </td>
                </tr>
            </table>
        </div>)
    } else {
        return (<di>
            <h3>Pas des données disponible</h3>
        </di>)
    }

}