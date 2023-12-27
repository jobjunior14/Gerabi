import React from "react";
import { useSelector } from "react-redux";

export default function Benefice ({depenseEff}) {

    //data
    const data = useSelector(state => state.mensRapport.suiviVente);
    const perte = useSelector(state => state.mensRapport.perte);
    
    // useEffect(() => {

    // }, [data, perte])
    if ( data.bralima && data.brasimba && data.autreProduit && data.liqueurs ) {

        if ( data.bralima.length > 0 && data.brasimba.length > 0 && data.autreProduit.length > 0 && data.liqueurs.length > 0 ) {

            const total = data.bralima[0].benefice + data.brasimba[0].benefice + data.autreProduit[0].benefice + data.liqueurs[0].benefice;

            return (<div> 

                <h3> BENEFICE </h3>
                <p> </p>
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
                            <td> {data.bralima[0].benefice}</td>
                        </tr>
                        <tr>
                            <td> Brasimba </td>
                            <td> {data.brasimba[0].benefice}</td>
                        </tr>
                        <tr>
                            <td> Autre Produit </td>
                            <td> {data.autreProduit[0].benefice}</td>
                        </tr>
                        <tr>
                            <td> Liqueurs </td>
                            <td> {data.liqueurs[0].benefice}</td>
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
                            <td> {perte}</td>
                        </tr>
                        <tr>
                            <td> Dépenses éffectuées  </td>
                            <td> {depenseEff}</td>
                        </tr>
                        <tr>
                            <td>Benefice net  </td>
                            <td> {total - (perte + depenseEff)} </td>
                        </tr>
                    </tbody>
                </table>
            </div>)
        } else {
            return (<div>
                <h3>BENEFICE</h3>
                <h4>Ouuppss!! date n'a pas de donne </h4>
            </div>)
        }
    } else {
        return (<div>
            <h3>BENEFICE</h3>
            <h4>Chargement....</h4>
        </div>)
    }

}