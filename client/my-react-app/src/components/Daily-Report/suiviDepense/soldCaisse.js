import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { suiviDepenseActions } from "../../store/suiviDepense-slice";

export default function SoldCaisse () {

    const soldCaisse = useSelector (state => state.suiviDepense.soldCaisse);
    const sortieCaisseData = useSelector (state => state.suiviDepense.sortieCaisse);
    const totalSortieCaisse = useSelector (state => state.suiviDepense.totalSortieCaisse);
    const totalSoldCaisse = useSelector(state => state.suiviDepense.totalSoldCaisse);
   

    if (sortieCaisseData){

        if (sortieCaisseData.length > 0) {

            return (<div>
                <h3> Sold Caisse</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>Montant</th>
                            <td> {Number (totalSoldCaisse) - Number (totalSortieCaisse)} </td>
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