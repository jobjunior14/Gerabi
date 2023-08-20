export function ExcelSecLayout ( props)
{
    return (
        <table>
            <tr> 
                <th>ACHAT JOURNALIER </th>
                <th> BENEFICE SUR VENTE </th>
                <th> ... </th>
                <th> VENTE JOURNALIERE </th>
                <th> BENEFICE SUR VENTE </th>
                <th> STOCK CONSIGNATION </th>
                <th> STOCK APRES VENTE </th>
            </tr>
            <tr>
                <th> 
                    <th> Name </th>
                    <th> QUANTITE CAISSE </th>
                    <th>Nbr Btll/C</th>
                    <th>Prix d'achat Gros </th>
                </th>
                <th>
                    <th>Val Gros Approvisionnement</th>
                    <th> Val Detail</th>
                    <th> Benefice</th>
                </th>
                <th>
                    <th>STOCK GEN</th>
                    <th>Valeur stock Det</th>
                    <th> Ref prix Gros</th>
                    <th>Val stock Gros</th>
                    <th> Marge Beneficiare</th>
                </th>
                <th>
                    <th> Ref prix Det</th>
                    <th> Qte Vendue comptoir</th>
                    <th> Valeur </th>
                </th>
                <th> BENEFICE SUR VENTE</th>
                <th>
                    <th>Quantié</th>
                    <th> Valeur </th>
                </th>
                <th>
                   <tr>
                    <th>Reste comptoir</th>
                    <th> Reste stock Depot</th>
                    <th> VALEUR STOCK</th>
                   </tr>
                   <tr>
                    <th>
                        <th>Qte Bouteilles</th>
                        <th> Valeur</th>
                    </th>
                    <th>
                        <th> Qte Caisses </th>
                        <th> Qte Bouteilles  </th>
                        <th> Valeur </th>
                    </th>
                    <th> VALEUR STOCK </th>
                   </tr>
                </th>
            </tr>
            {props.name}
            <tr> 
                <th> Total En Francs </th>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td> {props.total}</td>
            </tr>
            <tr> 
                <th> Total En $ </th>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td> {props.total}</td>
            </tr>
            <tr>
                <th>val Prece 1</th>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
            </tr>
            <tr>
                <th>val Prece 1</th>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
            </tr>
        
            
        </table>
    )
}