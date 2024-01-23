/* eslint-disable react/prop-types */
import {useState, useCallback, useEffect, useId}from "react";
import EntreeCaisseComp from "./components/entreeCaisseComp";
import { useSelector, useDispatch } from "react-redux";
import { suiviDepenseActions } from "../../store/suiviDepense-slice";
import LoadingError from "../../errorPages/LoadingError";
import PostAndUpdateError from "../../errorPages/postAndUpdateError";
export default function EntreeCaisse ({ foundPrevSold, prevDay, prevMonth, prevYear, loading, error, pError }){

    const dispatch = useDispatch ();
    const data = useSelector(state => state.suiviDepense.entreeCaisse);
    const prevSoldCaisse = useSelector(state => state.suiviDepense.prevSoldCaisse);
    const readOnly = useSelector (state => state.suiviDepense.readOnly);
    const id  = useId();
    //data for sold caisse
    const totalSoldCaisse = useSelector (state => state.suiviDepense.totalSoldCaisse);
    const [totalEntreeCaisse, setTotalEntreeCaisse] = useState(0);
    const [displayData, setDisplayData] = useState(null);
    
    //side effect memorize calculations of total entree caisse
    const memoTotEntreeCaisse = useCallback(() => {
        if (data) {

            let savetotalEntreeCaisse = 0
            //set the total entree caisse
            for (let i of data) {
                if (i.name !== "" && i.data.amount !== "") {
                    
                    savetotalEntreeCaisse += i.data.amount;
                }
            }
            //change the state using the parent's function
            return savetotalEntreeCaisse;
        }
    },[data]);

    //side effect render the body's table
    useEffect(() => {
        if (data) {
            setDisplayData(data.map((el, index) => <EntreeCaisseComp key = {index}  index = {index} prev = {el} />));
            
        }
    }, [data]);
    
    //side effect updating the totalSoldCaisse
    useEffect(() => {
        if (data) {
           
            //set the total amount entree caisse
            setTotalEntreeCaisse( memoTotEntreeCaisse());

            //dispatch the prev taped sold caisse
            dispatch(suiviDepenseActions.setTotalSoldCaisse( memoTotEntreeCaisse() + prevSoldCaisse));
        }
        
    }, [memoTotEntreeCaisse(), totalEntreeCaisse, prevSoldCaisse]);


    const thStyle = "border-2 border-gray-900 dark:border-gray-50";

    if (pError) {
        return (<PostAndUpdateError message={pError.message}/>);
    } else {

        if (!loading && data) {
            
            if (data.length > 0) {
    
                return (
                   <div className=" text-center justify-center items-center block -mt-5">
                        <div className=" justify-center flex -mb-10">
                            <h3 className="lg:text-2xl text-xl font-semibold text-gray-700 dark:text-gray-50 block absolute mt-6">Entrée Caisse</h3>
                                <table className=" border-collapse duration-300 table-fixed font-normal border-2 dark:border-gray-50  border-gray-900 my-16">
                                    <tbody>
                                        {displayData}
                                        <tr className="bg-slate-300">
                                            <th className={thStyle}>Total Entrée</th>
                                            <td className={thStyle}> {totalEntreeCaisse} </td>
                                        </tr>
                                        <tr>
                                            <th className="border-2 border-gray-900 dark:text-gray-50 dark:bg-violet-400 font-semibold dark:border-gray-50"> Total Sold Caisse</th>
                                            <td className="border-2 border-gray-900 dark:text-gray-50 dark:bg-violet-400 font-semibold dark:border-gray-50"> {totalSoldCaisse} </td>
                                        </tr>
        
                                    </tbody>
                                </table>
                        </div>
                        <div className="block" >
    
                            { foundPrevSold && <div className="block mb-5">
    
                                <p className="font-semibold text-gray-600 dark:text-gray-200"> Le sold caisse du {prevYear}/{prevMonth}/{prevDay}, n&apos;a pas été trouvé </p>
                                <label className="font-semibold text-gray-800 dark:text-gray-200" id = {'inputfromUser' + id}> S&apos;il est existant veillez le taper: </label>
                                <input 
                                        className=" pl-1 w-32 bg-slate-400 rounded-lg duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                                    type="number"
                                    id = {'inputfromUser' + id}
                                    placeholder="Tapez le precedent sold caisse"
                                    defaultValue={prevSoldCaisse}
                                    onChange={(e) => { dispatch(suiviDepenseActions.handleSoldCaisseByUser(Number (e.target.value)))} }
                                />
                            </div>}
                            { !readOnly && <button className="px-5 py-1  bg-gray-500 text-gray-100 rounded-md -mt-8 " onClick={() => dispatch(suiviDepenseActions.addProductEntreeCaisse())}> Ajouter un Nom</button>}
                        </div>
                    </div>)
            } else {
                return(
                    <div className="m-4">
                        <h3 className="lg:text-2xl text-xl font-semibold text-gray-700">Entree Caisse</h3>
                        <h4> Ouuups!! cette date n&apos;a pas de donnee</h4>
                        <button className="px-5 py-1 bg-gray-500 text-gray-100 rounded-md " onClick={() => dispatch(suiviDepenseActions.addProductEntreeCaisse())}> Ajouter un Nom</button>
                    </div>
                );
            }
        } else {
            //Loading page
            if (loading) {
                return (<h1 className="text-xl my-5 font-semibold animate-pulse">Chargement...</h1>);
            }
            //the Loading data error Page
            if(error) {
                return (
                    <LoadingError  message={error.message}/>
                );
            }
        }
    }
}

