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

            return (
            <div className=" text-center justify-center items-center block mt-5">
                <div className=" flex justify-center mt-10">
                    <h3 className="text-2xl font-semibold text-gray-700 block -mt-5 absolute"> Dette Musiciens </h3>
                    <div className="tetx-center border-2 border-slate-600  overflow-x-auto px-4 mt-4 rounded-lg ">
                        <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900 my-5">
                            <thead>
                                <tr>
                                    <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Nom</th>
                                    <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Montant</th>
                                    <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Montant Payé</th>
                                    <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Total Dette</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderDataDisplay()}
                            </tbody>
                            <tfoot>
                                <tr className=" bg-slate-400">
                                    <th>Total</th>
                                    <td> {totalDetteMusiciens} </td>
                                    <td>.</td>
                                    <td>.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div className="mt-5">
                    {!readOnly && <button className="px-5 py-1  bg-gray-500 text-gray-100 rounded-md -mt-8 " onClick={() => dispatch(suiviDetteActions.addCaseMusiciens())}> Ajouter Un Nom</button>}
                </div>
            </div>)
        } else {
           return (
                <div className="m-4">
                    <h3 className="text-2xl font-semibold text-gray-700"> Dette Musiciens </h3>
                    <h4> Ooouups!!! cette date n'a pas des données </h4>
                    <button className="px-5 py-1 bg-gray-500 text-gray-100 rounded-md " onClick={() => dispatch(suiviDetteActions.addCaseMusiciens())}> Ajouter Un Nom</button>
                </div>
            );
        };
   } else {
     return (<div className=" justify-center flex">
                <h3 className="text-2xl font-semibold text-gray-700 block absolute"> Dette Musiciens</h3>
                <div className=" items-center justify-center my-40"> 
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 rounded-full animate-pulse dark:bg-indigo-400"></div>
                        <div className="w-5 h-5 rounded-full animate-pulse dark:bg-indigo-400"></div>
                        <div className="w-5 h-5 rounded-full animate-pulse dark:bg-indigo-400"></div>
                    </div>
            </div>
        </div>)
   };
}
