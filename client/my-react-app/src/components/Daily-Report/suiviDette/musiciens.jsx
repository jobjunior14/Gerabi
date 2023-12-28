import {useEffect, useState, useCallback} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../store/suiviDette-slice";
import { useId } from "react";
import { indexMatcher } from "../../reuseFunction/suividette/indexMatch";
import DebtDisplay from "./components/dispalyDebtComp";

export default function Musiciens ({loading}){

    const dispatch = useDispatch();

    const id = useId();
    const musiciensData = useSelector (state => state.suiviDette.musiciens);
    const readOnly = useSelector (state => state.suiviDette.readOnly);
    const totalDetteAndPaymentMusiciens = useSelector(state => state.suiviDette.detailTotDetteMusiciens);
    const [totalDetteMusiciens, setTotalDetteMusiciens] = useState (0);
    const [savetotalDetteAndPaymentMusiciens, setSavetotalDetteAndPaymentMusiciens] = useState(0);

    //side effect
    useEffect (() => {
        let savetotalDetteMusiciens = 0;
        if (musiciensData && totalDetteAndPaymentMusiciens) {

            //await data from the aerver to display the calculation of total debt to not getting error in the indexmacher function
            if (musiciensData.length > 0 && musiciensData.length === totalDetteAndPaymentMusiciens.length) {
                
                setSavetotalDetteAndPaymentMusiciens(indexMatcher(musiciensData, totalDetteAndPaymentMusiciens));
            };
            for (let i = 0; i < musiciensData.length; i++) {
                //total Dette Musiciens
                savetotalDetteMusiciens += musiciensData[i].data.amount;
            };
        };
        //set the total Dette agent
        setTotalDetteMusiciens(prev => prev = savetotalDetteMusiciens);
    }, [musiciensData, totalDetteAndPaymentMusiciens]);

    console.log();
    //side effect
    const renderDataDisplay = useCallback(() => {
        if (musiciensData && totalDetteAndPaymentMusiciens) {
            return musiciensData.map((el, i) =>  {
                return (
                    <DebtDisplay
                        key = {`musiciens:${i}`}
                        {...el}
                        id = {id}
                        tr = {`trMusiciens:${i}`}
                        readOnly = {readOnly}
                        in1 = 'nameMusiciens'
                        in2 = 'amountMusiciens'
                        in3 = 'paymentMusiciens'
                        component = 'musiciens'
                        totDebt = {savetotalDetteAndPaymentMusiciens[i]  ? savetotalDetteAndPaymentMusiciens[i].valeurDette - savetotalDetteAndPaymentMusiciens[i].valeurPayment : 0 }
                    />
                )
            });
        }
    }, [musiciensData,readOnly, savetotalDetteAndPaymentMusiciens]);

    if (!loading && musiciensData) {
        if (musiciensData.length > 0) {

            return (<div>
                <h3> Dette Musiciens </h3>
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
                            <td> {totalDetteMusiciens} </td>
                        </tr>
                    </tfoot>
                </table>
                {!readOnly && <button onClick={() => dispatch(suiviDetteActions.addCaseMusiciens())}> Ajouter Un Nom</button>}
            </div>)
        } else {
            return (
                <div>
                    <h3> Dette Musiciens </h3>
                    <button onClick={() => dispatch(suiviDetteActions.addCaseMusiciens())}> Ajouter Un Nom</button>
                    <h4> Ooouups!!! cette date n'a pas des données </h4>
                </div>
            );
        };
   } else {
    return (
        <h4> Chargement... </h4>
    );
   };
}
