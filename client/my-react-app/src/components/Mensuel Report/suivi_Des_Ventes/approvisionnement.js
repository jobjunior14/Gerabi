import React from "react";
import { useSelector } from "react-redux";

export default function Approvisionnement () {

    //data
    const data = useSelector(state => state.venteBar.mensualData);
   
    if (data && data.bralima && data.brasimba && data.liqueurs && data.autreProduit) {

        const total = data.bralima.approvionnement + data.brasimba.approvionnement + data.autreProduit.approvionnement + data.liqueurs.approvionnement;

        return (<div> 

            <h3> APPROVISIONNEMENT</h3>
            <p> </p>
            <table>

                <tr>
                    <th> Libelé </th>
                    <th> Montant </th>
                </tr>
                <tr>
                    <td> Bralima </td>
                    <td> {data.bralima.approvionnement}</td>
                </tr>
                <tr>
                    <td> Brasimba </td>
                    <td> {data.brasimba.approvionnement}</td>
                </tr>
                <tr>
                    <td> Autre Produit </td>
                    <td> {data.autreProduit.approvionnement}</td>
                </tr>
                <tr>
                    <td> Liqueurs </td>
                    <td> {data.liqueurs.approvionnement} </td>
                </tr>
                <tr>
                    <td> Total </td>
                    <td> {total}</td>
                </tr>
            </table>
        </div>)
    } else {
        return (<di>
            <h3>Pas des données disponible</h3>
        </di>)
    }

}