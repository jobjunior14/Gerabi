import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function VenteBar () {

    //data
    const data = useSelector(state => state.mensRapport.suiviVente);

    
    //dataDego Vente
    const [venteDego, setVenteDego] = useState(null);

    //params
    const [dateParams] = useSearchParams();

    //dependacies of useEffect
    const year = Number(dateParams.get("year"));
    const month = Number(dateParams.get("month")); 

    const componentName = useSelector (state => state.mensRapport.componentName);


    useEffect(() => {

        try {
            
            const fecthData = async () => {
    
                const dataVente = await axios.get(`http://localhost:5001/api/v1/${componentName}/vente/${year}/${month}`);
    
                if (dataVente.data.stats.stats.length > 0){
    
                    setVenteDego(dataVente.data.stats.stats[0].venteDego);
                };
    
            };fecthData();
        } catch (error) {
            console.log (error);
        }
    }, [year, month, componentName]);

    if (data.bralima && data.brasimba && data.autreProduit ) {

        if ( data.bralima.length > 0 && data.brasimba.length > 0 && data.autreProduit.length > 0 ) {

            const totalVenteSysteme = data.bralima[0].vente_bar + data.brasimba[0].vente_bar + data.autreProduit[0].vente_bar;
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
    }

}