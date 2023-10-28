import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function VenteBar () {

    //data
    const data = useSelector(state => state.venteBar.mensualData);
    
    //date Params
    const date = useSelector(state => state.venteBar.date);
    //dataDego Vente
    const [venteDego, setVenteDego] = useState(null);

    useEffect(() => {

        const fecthData = async () => {

            const dataVente = await axios.get(`http://localhost:5001/api/v1/vente/${date.year}/${date.month}`);
            setVenteDego(dataVente.data.stats.stats[0].venteDego);

        };fecthData();
    });

    if (data && data.bralima && data.brasimba && data.autreProduit && venteDego) {

        const totalVenteSysteme = data.bralima.vente_bar + data.brasimba.vente_bar + data.autreProduit.vente_bar;
        const pertes = totalVenteSysteme - venteDego;

        return (<div> 

            <h3> VENTE BAR</h3>
            <p> </p>
            <table>

                <tr>
                    <th> Libelé </th>
                    <th> Montant </th>
                </tr>
                <tr>
                    <td> Bralima </td>
                    <td> {data.bralima.vente_bar}</td>
                </tr>
                <tr>
                    <td> Brasimba </td>
                    <td> {data.brasimba.vente_bar}</td>
                </tr>
                <tr>
                    <td> Autre Produit </td>
                    <td> {data.autreProduit.vente_bar}</td>
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
            </table>

        </div>)
    } else {
        return (<di>
            <h3>Pas des données disponible</h3>
        </di>)
    }

}