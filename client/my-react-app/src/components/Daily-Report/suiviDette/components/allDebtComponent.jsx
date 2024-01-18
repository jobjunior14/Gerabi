/* eslint-disable react/prop-types */
import {useEffect, useState, useCallback} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { suiviDetteActions } from "../../../store/suiviDette-slice";
import { useId } from "react";
import { indexMatcher } from "../../../reuseFunction/suividette/indexMatch";
import DebtDisplay from "../components/dispalyDebtComp";
import LoadingError from "../../../errorPages/LoadingError";
import PostAndUpdateError from "../../../errorPages/postAndUpdateError";

export default function AllDebtComp ({loading, error, pError, debtName, totalDetailDebtName, name, dispatchName}){

    const dispatch = useDispatch();

    const id = useId();
    const nameData = useSelector (state => state.suiviDette[debtName]);
    const readOnly = useSelector (state => state.suiviDette.readOnly);
    const totalDetteAndPaymentName = useSelector(state => state.suiviDette[totalDetailDebtName]);
    const [totalDetteName, setTotalDetteName] = useState (0);
    const [savetotalDetteAndPaymentName, setSavetotalDetteAndPaymentName] = useState(0);

    //side effect making calcul
    useEffect (() => {
        let savetotalDetteName = 0;
        if (nameData && totalDetteAndPaymentName) {

            //await data from the aerver to display the calculation of total debt to not getting error in the indexmacher function
            if (nameData.length > 0 && nameData.length === totalDetteAndPaymentName.length) {
                
                setSavetotalDetteAndPaymentName(indexMatcher(nameData, totalDetteAndPaymentName));
            }
            for (let i = 0; i < nameData.length; i++) {
                //total {name}
                savetotalDetteName += nameData[i].data.amount;
            }
        }
        //set the total Dette agent
        setTotalDetteName( savetotalDetteName);
    }, [nameData, totalDetteAndPaymentName]);

    //side effect render the table body
    const renderDataDisplay = useCallback(() => {
        if ((nameData && totalDetteAndPaymentName) ) {
            return nameData.map((el, i) =>  {
                return (
                     <DebtDisplay 
                        key ={`${debtName}:${i}`}
                        {...el}
                        id = {id}
                        tr = {`tr${debtName}:${i}`}
                        readOnly = {readOnly}
                        in1 = {`name${debtName}`}
                        in2 = {`amount${debtName}`}
                        in3 = {`paymenta${debtName}`}
                        component = {`${debtName}`}
                        totDebt = {savetotalDetteAndPaymentName[i] ? savetotalDetteAndPaymentName[i].valeurDette - savetotalDetteAndPaymentName[i].valeurPayment : 0 }
                    />
                );
            });
        }
    }, [nameData,readOnly, savetotalDetteAndPaymentName]);

    if (pError) {
        return (<PostAndUpdateError message={pError.message}/>);
    } else {

        if (!loading && nameData) {
            if (nameData.length > 0) {
    
                return (
                <div className=" text-center justify-center items-center block mt-5">
                    <div className=" flex justify-center mt-10">
                        <h3 className="lg:text-2xl text-xl font-semibold text-gray-700 block -mt-5 absolute"> {name} </h3>
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
                                        <td> {totalDetteName} </td>
                                        <td>.</td>
                                        <td>.</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div className="mt-5">
                        {!readOnly && <button className="px-5 py-1  bg-gray-500 text-gray-100 rounded-md -mt-8  " onClick={() => dispatch(suiviDetteActions[dispatchName]())}> Ajouter Un Nom</button>}
                    </div>
                </div>)
            } else {
                return (
                    <div className="m-4">
                        <h3 className="lg:text-2xl text-xl font-semibold text-gray-700"> {name} </h3>
                        <h4> Ooouups!!! cette date n&apos;a pas des données </h4>
                        <button className="px-5 py-1 bg-gray-500 text-gray-100 rounded-md " onClick={() => dispatch(suiviDetteActions[dispatchName]())}> Ajouter Un Nom</button>
                    </div>
                );
            };
        } else {
            
            if ( error) {
                return (<LoadingError message={error.message}/>);
            }
            if (loading) {
                return (<div className=" justify-center flex">
                        <h3 className="lg:text-2xl text-xl font-semibold text-gray-700 block absolute"> {name}</h3>
                        <div className=" items-center justify-center my-28"> 
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-2 h-2 rounded-full animate-pulse dark:bg-indigo-400"></div>
                                <div className="w-2 h-2 rounded-full animate-pulse dark:bg-indigo-400"></div>
                                <div className="w-2 h-2 rounded-full animate-pulse dark:bg-indigo-400"></div>
                            </div>
                    </div>
                </div>);
            }
       }
    }
}
