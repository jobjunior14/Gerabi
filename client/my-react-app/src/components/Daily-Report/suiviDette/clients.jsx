import React, {useEffect, useState, useCallback} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../store/suiviDette-slice";
import { useId } from "react";
import { indexMatcher } from "../../reuseFunction/suividette/indexMatch";
import DebtDisplay from "./components/dispalyDebtComp";

export default function Clients ({loading}){

    const dispatch = useDispatch();

    const id = useId();
    const clientsData = useSelector (state => state.suiviDette.clients);
    const readOnly = useSelector (state => state.suiviDette.readOnly);
    const totalDetteAndPaymentClients = useSelector(state => state.suiviDette.detailTotDetteClients);
    const [totalDetteClients, setTotalDetteClients] = useState (0);
    const [savetotalDetteAndPaymentClients, setSavetotalDetteAndPaymentClients] = useState(0);

    //side effect
    useEffect (() => {
        let savetotalDetteClients = 0;
        if (clientsData && totalDetteAndPaymentClients) {

            //await data from the aerver to display the calculation of total debt to not getting error in the indexmacher function
            if (clientsData.length > 0 && clientsData.length === totalDetteAndPaymentClients.length) {
                
                setSavetotalDetteAndPaymentClients(indexMatcher(clientsData, totalDetteAndPaymentClients));
            };
            for (let i = 0; i < clientsData.length; i++) {
                //total Dette Agents
                savetotalDetteClients += clientsData[i].data.amount;
            };
        };
        //set the total Dette agent
        setTotalDetteClients(prev => prev = savetotalDetteClients);
    }, [clientsData, totalDetteAndPaymentClients]);

    //side effect
    const renderDataDisplay = useCallback(() => {
        if (clientsData && totalDetteAndPaymentClients) {
            return clientsData.map((el, i) =>  {
                return (
                     <DebtDisplay 
                        key = {`clients:${i}`}
                        {...el}
                        id = {id}
                        tr = {`trclients:${i}`}
                        readOnly = {readOnly}
                        in1 = 'nameclients'
                        in2 = 'amountclients'
                        in3 = 'paymentclients'
                        component = 'clients'
                        totDebt = {savetotalDetteAndPaymentClients[i] ? savetotalDetteAndPaymentClients[i].valeurDette - savetotalDetteAndPaymentClients[i].valeurPayment : 0 }
                    />
                )
            });
        }
    }, [clientsData,readOnly, savetotalDetteAndPaymentClients]);

   if (!loading && clientsData) {
        if (clientsData.length > 0) {

            return (
            <div className=" text-center justify-center items-center block">
                <div className=" justify-center flex ">
                    <h3 className="text-2xl font-semibold text-gray-700 block absolute mt-6"> Dette Clients </h3>
                    <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900 my-16">
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
                                <td> {totalDetteClients} </td>
                                <td>.</td>
                                <td>.</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="-mt-10">
                    {!readOnly && <button className="px-5 py-1  bg-gray-500 text-gray-100 rounded-md -mt-8 " onClick={() => dispatch(suiviDetteActions.addCaseClients())}> Ajouter Un Nom</button>}
                </div>
            </div>)
        } else {
           return (
                <div className="m-4">
                    <h3 className="text-2xl font-semibold text-gray-700"> Dette Clients </h3>
                    <h4> Ooouups!!! cette date n'a pas des données </h4>
                    <button className="px-5 py-1 bg-gray-500 text-gray-100 rounded-md " onClick={() => dispatch(suiviDetteActions.addCaseClients())}> Ajouter Un Nom</button>
                </div>
            );
        };
   } else {
        return (<div className=" justify-center flex">
                <h3 className="text-2xl font-semibold text-gray-700 block absolute"> Dette Clients</h3>
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
