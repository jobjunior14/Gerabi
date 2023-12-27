import React from "react";
import { useSelector } from "react-redux";

export default function SoldCaisse ({loading}) {


    const sortieCaisseData = useSelector (state => state.suiviDepense.sortieCaisse);
   
    const soldCaisse = useSelector (state => state.suiviDepense.soldCaisse);


    if (!loading && sortieCaisseData){

        if (sortieCaisseData.length > 0) {

            return (<div>
                <h3> Sold Caisse</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>Montant</th>
                            <td> {soldCaisse} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            )
        }
    } else {

        return (<h4> Chargement...</h4>)
    }
}