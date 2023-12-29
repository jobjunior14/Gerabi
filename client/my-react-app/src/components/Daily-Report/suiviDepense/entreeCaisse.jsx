import React, {useState, useCallback, useEffect, useId}from "react";
import EntreeCaisseComp from "./components/entreeCaisseComp";
import { useSelector, useDispatch } from "react-redux";
import { suiviDepenseActions } from "../../store/suiviDepense-slice";


export default function EntreeCaisse ({setTotEntree, foundPrevSold, prevDay, prevMonth, prevYear, loading }){

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
                };
            };
            //change the state using the parent's function
            setTotEntree(savetotalEntreeCaisse);
            return savetotalEntreeCaisse;
        };
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
        };
        
    }, [memoTotEntreeCaisse(), totalEntreeCaisse, prevSoldCaisse]);

    
    if (!loading && data) {
        
        if (data.length > 0) {

            return (
               <div className=" text-center justify-center items-center block">
                    <div className=" justify-center flex ">
                        <h3 className="text-2xl font-semibold text-gray-700 block absolute mt-6">Entrée Caisse</h3>
                        <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900 my-16">
                            <tbody>
                                {displayData}
                                <tr className="bg-slate-300">
                                    <th className=" border-2 border-gray-900">Total Entrée</th>
                                    <td className="border-2 border-gray-900"> {totalEntreeCaisse} </td>
                                </tr>
                                <tr>
                                    <th className=" border-2 border-gray-900"> Total Sold Caisse</th>
                                    <td className="border-2 border-gray-900"> {totalSoldCaisse} </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    { foundPrevSold && <>

                        <p> Le sold caisse du {prevYear}/{prevMonth}/{prevDay}, n'a pas été trouvé </p>
                        <label id = {'inputfromUser' + id}> S'il est existant veillez le taper</label>
                        <input 
                            type="number"
                            id = {'inputfromUser' + id}
                            placeholder="Tapez le precedent sold caisse"
                            value={prevSoldCaisse}
                            onChange={(e) => { dispatch(suiviDepenseActions.handleSoldCaisseByUser(Number (e.target.value)))} }
                        />
                    </>}
                    { !readOnly && <button onClick={() => dispatch(suiviDepenseActions.addProductEntreeCaisse())}> Ajouter un produit</button>}
                </div>)
        } else {
            return(
                <div>
                    <h3>Entree Caisse</h3>
                    <button onClick={() => dispatch(suiviDepenseActions.addProductEntreeCaisse())}> Ajouter un produit</button>
                    <h4> Ouuups!! cette date n'a pas de donnee</h4>
                </div>
            )
        };
    } else {
        <h4> Chargement....</h4>
    };
}

