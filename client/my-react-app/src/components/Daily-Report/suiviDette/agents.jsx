import {useEffect, useState, useCallback} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../store/suiviDette-slice";
import { useId } from "react";
import { indexMatcher } from "../../reuseFunction/suividette/indexMatch";
import DebtDisplay from "./components/dispalyDebtComp";


export default function Agents ({loading}){

    const dispatch = useDispatch();

    const id = useId();
    const agentsData = useSelector (state => state.suiviDette.agents);
    const readOnly = useSelector (state => state.suiviDette.readOnly);
    const totalDetteAndPaymentAgent = useSelector(state => state.suiviDette.detailTotDetteAgents);
    const [totalDetteAgent, setTotalDetteAgent] = useState (0);
    const [savetotalDetteAndPaymentAgents, setSavetotalDetteAndPaymentAgents] = useState(0);

    //side effect making calcul
    useEffect (() => {
        let savetotalDetteAgent = 0;
        if (agentsData && totalDetteAndPaymentAgent) {

            //await data from the aerver to display the calculation of total debt to not getting error in the indexmacher function
            if (agentsData.length > 0 && agentsData.length === totalDetteAndPaymentAgent.length) {
                
                setSavetotalDetteAndPaymentAgents(indexMatcher(agentsData, totalDetteAndPaymentAgent));
            };
            for (let i = 0; i < agentsData.length; i++) {
                //total Dette Agents
                savetotalDetteAgent += agentsData[i].data.amount;
            };
        };
        //set the total Dette agent
        setTotalDetteAgent( savetotalDetteAgent);
    }, [agentsData, totalDetteAndPaymentAgent]);

    //side effect render the table body
    const renderDataDisplay = useCallback(() => {
        if ((agentsData && totalDetteAndPaymentAgent) ) {
            return agentsData.map((el, i) =>  {
                return (
                     <DebtDisplay 
                        key ={`agents:${i}`}
                        {...el}
                        id = {id}
                        tr = {`trAgents:${i}`}
                        readOnly = {readOnly}
                        in1 = 'nameagents'
                        in2 = 'amountagents'
                        in3 = 'paymentagents'
                        component = 'agents'
                        totDebt = {savetotalDetteAndPaymentAgents[i] ? savetotalDetteAndPaymentAgents[i].valeurDette - savetotalDetteAndPaymentAgents[i].valeurPayment : 0 }
                    />
                )
            });
        }
    }, [agentsData,readOnly, savetotalDetteAndPaymentAgents]);

   if (!loading && agentsData) {
        if (agentsData.length > 0) {

            return (
            <div className=" text-center justify-center items-center block mt-5">
                <div className=" flex justify-center mt-10">
                    <h3 className="text-2xl font-semibold text-gray-700 block -mt-5 absolute"> Dette Agents </h3>
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
                                    <td> {totalDetteAgent} </td>
                                    <td>.</td>
                                    <td>.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div className="mt-5">
                    {!readOnly && <button className="px-5 py-1  bg-gray-500 text-gray-100 rounded-md -mt-8  " onClick={() => dispatch(suiviDetteActions.addCaseAgents())}> Ajouter Un Nom</button>}
                </div>
            </div>)
        } else {
            return (
                <div className="m-4">
                    <h3 className="text-2xl font-semibold text-gray-700"> Dette Agents </h3>
                    <h4> Ooouups!!! cette date n'a pas des données </h4>
                    <button className="px-5 py-1 bg-gray-500 text-gray-100 rounded-md " onClick={() => dispatch(suiviDetteActions.addCaseAgents())}> Ajouter Un Nom</button>
                </div>
            );
        };
   } else {
        return (<div className=" justify-center flex">
                <h3 className="text-2xl font-semibold text-gray-700 block absolute"> Dette Agents</h3>
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
