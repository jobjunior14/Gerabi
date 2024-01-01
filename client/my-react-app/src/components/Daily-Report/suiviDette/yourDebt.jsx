import React, {useEffect, useState, useCallback} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../store/suiviDette-slice";
import { useId } from "react";
import { indexMatcher } from "../../reuseFunction/suividette/indexMatch";
import DebtDisplay from "./components/dispalyDebtComp";


export default function YourDebts ({loading}){

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
                        totDebt = {savetotalDetteAndPaymentFournisseurs[i] ? savetotalDetteAndPaymentFournisseurs[i].valeurDette - savetotalDetteAndPaymentFournisseurs[i].valeurPayment : 0 }
                    />
                )
            });
        }
    }, [fournisseursData,readOnly, savetotalDetteAndPaymentFournisseurs]);

   if (!loading && fournisseursData) {
        if (fournisseursData.length > 0) {
            return (
            <div className=" text-center justify-center items-center block pb-4 ">
                <div className=" flex justify-center mt-10">
                    <h3 className="lg:text-2xl text-xl font-semibold text-gray-700 block -mt-5 absolute"> Mes Dettes </h3>
                    <div className="tetx-center border-2 border-slate-600  overflow-x-auto px-4 mt-5 rounded-lg ">
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
                                    <td> {totalDetteFournisseurs} </td>
                                    <td>.</td>
                                    <td>.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div className="mt-5">
                    {!readOnly && <button className="px-5 py-1  bg-gray-500 text-gray-100 rounded-md -mt-8 "  onClick={() => dispatch(suiviDetteActions.addCaseFournisseurs())}> Ajouter Un Nom</button>}
                </div>
            </div>)
        } else {
             return (
                <div className="m-4">
                    <h3 className="lg:text-2xl text-xl font-semibold text-gray-700"> Dette Musiciens </h3>
                    <h4> Ooouups!!! cette date n'a pas des données </h4>
                    <button className="px-5 py-1 bg-gray-500 text-gray-100 rounded-md " onClick={() => dispatch(suiviDetteActions.addCaseFournisseurs())}> Ajouter Un Nom</button>
                </div>
            );
        };
   } else {
     return (<div className=" justify-center flex">
                <h3 className="lg:text-2xl text-xl font-semibold text-gray-700 block absolute"> Dette Musiciens</h3>
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
