import React, {useEffect} from "react";
import { useSelector } from "react-redux";

export default function Approvisionnement () {

    //data
    const data = useSelector(state => state.mensRapport.suiviVente);
    
    // useEffect(() => {

    // }, [data])
    if (data.bralima && data.brasimba && data.liqueurs && data.autreProduit) {

        if (data.bralima.length > 0 && data.brasimba.length > 0 && data.liqueurs.length > 0 && data.autreProduit.length > 0) {

            const total = data.bralima[0].approvionnement + data.brasimba[0].approvionnement + data.autreProduit[0].approvionnement + data.liqueurs[0].approvionnement;

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
                        <td> {data.bralima[0].approvionnement}</td>
                    </tr>
                    <tr>
                        <td> Brasimba </td>
                        <td> {data.brasimba[0].approvionnement}</td>
                    </tr>
                    <tr>
                        <td> Autre Produit </td>
                        <td> {data.autreProduit[0].approvionnement}</td>
                    </tr>
                    <tr>
                        <td> Liqueurs </td>
                        <td> {data.liqueurs[0].approvionnement} </td>
                    </tr>
                    <tr>
                        <td> Total </td>
                        <td> {total}</td>
                    </tr>
                </table>
            </div>)
        } else {

            return (<div>
                <h3>APPROVISIONNEMENT</h3>
                <h4>Ouuppss!! cette date n'a pas de donnee</h4>
            </div>)
        }
    } else {
        return (<div>
            <h3>APPROVISIONNEMENT</h3>
            <h4>Chargement....</h4>
        </div>)
    }

}