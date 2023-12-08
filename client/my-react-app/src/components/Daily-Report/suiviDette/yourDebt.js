import React, {useEffect, useState, useCallback} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../store/suiviDette-slice";
import { useId } from "react";
import { indexMatcher } from "../../reuseFunction/suividette/indexMatch";
import DebtDisplay from "./components/dispalyDebtComp";


export default function YourDebts (){

    const dispatch = useDispatch();

    const id = useId();
    const fournisseursData = useSelector (state => state.suiviDette.fournisseurs);
    const readOnly = useSelector (state => state.suiviDette.readOnly);
    const totalDetteAndPaymentFournisseurs = useSelector(state => state.suiviDette.detailTotDetteFournisseurs);
    const [totalDetteFournisseurs, setTotalDetteFournisseurs] = useState (0);
    const [savetotalDetteAndPaymentFournisseurs, setSavetotalDetteAndPaymentFournisseurs] = useState(0);

    //side effect making calcul
    useEffect (() => {
        let savetotalDetteFournisseurs = 0;
        if (fournisseursData && totalDetteAndPaymentFournisseurs) {

            //await data from the aerver to display the calculation of total debt to not getting error in the indexmacher function
            if (fournisseursData.length > 0 && fournisseursData.length === totalDetteAndPaymentFournisseurs.length) {
                
                setSavetotalDetteAndPaymentFournisseurs(indexMatcher(fournisseursData, totalDetteAndPaymentFournisseurs));
            };
            for (let i = 0; i < fournisseursData.length; i++) {
                //total Dette Agents
                savetotalDetteFournisseurs += fournisseursData[i].data.amount;
            };
        };
        //set the total Dette agent
        setTotalDetteFournisseurs(prev => prev = savetotalDetteFournisseurs);
    }, [fournisseursData, totalDetteAndPaymentFournisseurs]);

    //side effect render the table body
    const renderDataDisplay = useCallback(() => {
        if (fournisseursData && totalDetteAndPaymentFournisseurs) {
            return fournisseursData.map((el, i) =>  {
                return (
                     <DebtDisplay 
                        key ={`fournisseurs:${i}`}
                        {...el}
                        id = {id}
                        tr = {`trfournisseurs:${i}`}
                        readOnly = {readOnly}
                        in1 = 'namefournisseurs'
                        in2 = 'amountfournisseurs'
                        in3 = 'paymentfournisseurs'
                        component = 'fournisseurs'
                        totDebt = {savetotalDetteAndPaymentFournisseurs ? savetotalDetteAndPaymentFournisseurs[i].valeurDette - savetotalDetteAndPaymentFournisseurs[i].valeurPayment : 0 }
                    />
                )
            });
        }
    }, [fournisseursData,readOnly, savetotalDetteAndPaymentFournisseurs]);

   if (fournisseursData) {
        if (fournisseursData.length > 0) {

            return (<div>
                <h3> Mes Dettes </h3>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Montant</th>
                            <th>Montant Payé</th>
                            <th>Total Dette</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderDataDisplay()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <td> {totalDetteFournisseurs} </td>
                        </tr>
                    </tfoot>
                </table>
                {!readOnly && <button onClick={() => dispatch(suiviDetteActions.addCaseFournisseurs())}> Ajouter Un Nom</button>}
            </div>)
        } else {
            return (
                <div>
                    <h3> Mes Dettes </h3>
                    <button onClick={() => dispatch(suiviDetteActions.addCaseFournisseurs())}> Ajouter Un Nom</button>
                    <h4> Ooouups!!! cette date n'a pas des données </h4>
                </div>
            );
        };
   } else {
    return (
        <div>
            <h3> Tes Dettes</h3>
            <h4> Chargement... </h4>
        </div>
    );
   };
}
