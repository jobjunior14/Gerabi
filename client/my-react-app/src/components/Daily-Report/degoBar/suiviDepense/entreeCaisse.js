import React, {useState, useCallback, useEffect, useId}from "react";
import EntreeCaisseComp from "./components/entreeCaisseComp";
import { useSelector, useDispatch } from "react-redux";
import { suiviDepenseActions } from "../../../store/suiviDepense-slice";
import axios from "axios";
import { useSearchParams } from "react-router-dom";


export default function EntreeCaisse (props){

    const dispatch = useDispatch ();
    const data = useSelector(state => state.suiviDepense.entreeCaisse);
    const prevSoldCaisse = useSelector(state => state.suiviDepense.prevSoldCaisse);
    const readOnly = useSelector (state => state.suiviDepense.readOnly);
    const id  = useId();

    //params
    const [dateParams] = useSearchParams();

    //dependacies of useEffect
    const year = Number(dateParams.get("year"));
    const month = Number(dateParams.get("month")); 
    const day = Number(dateParams.get("day"));

    //get the previous date 
    const prevDate = new Date(year, month -1, day);

    //subtract one day
    prevDate.setDate(prevDate.getDate() - 1);

    const prevYear = prevDate.getFullYear();
    const prevMonth = prevDate.getMonth() + 1;
    const prevDay = prevDate.getDate();

    //data for sold caisse
    const soldCaisse = useSelector (state => state.suiviDepense.soldCaisse);
    const totalSortieCaisse = useSelector (state => state.suiviDepense.totalSortieCaisse);
    const totalDette = useSelector (state => state.suiviDepense.totalDette);
    const totalSoldCaisse = useSelector (state => state.suiviDepense.totalSoldCaisse);
    const [totalEntreeCaisse, setTotalEntreeCaisse] = useState(0);

    //message and input fields if prevSold is not found
    const [foundPrevSold, setFoundPrevSold] = useState(false);
    //fetch data
    useEffect(() => {

        const fecthData = async () => {

            const prevSuiviDepenseData = await axios.get (`http://localhost:5001/api/v1/${props.componentName}/suiviDepense/rapportJournalier/${prevYear}/${prevMonth}/${prevDay}`);
            
            if (!prevSuiviDepenseData.data.data.soldCaisse) {
                
                setFoundPrevSold(true);
            } else {
                
                dispatch(suiviDepenseActions.setPrevSoldCaisse(prevSuiviDepenseData.data.data.soldCaisse.amount));
                // set the previous sold caisse
                dispatch(suiviDepenseActions.setPrevSoldCaisse(soldCaisse - (totalDette + totalSortieCaisse)));
            };
        }; fecthData();
    }, [prevDay, prevMonth, prevYear]);
    
    //side effect making calcul
    useEffect(() => {

        if (data) {

            let savetotalEntreeCaisse = 0;
            //set the total entree caisse
            for (let i of data) {
                if (i.name !== "" && i.data.amount !== "") {
                    
                    savetotalEntreeCaisse += i.data.amount;
                };
            };
            //set the total amount entree caisse
            setTotalEntreeCaisse(savetotalEntreeCaisse);
            //dispatch the prev taped sold caisse
            dispatch(suiviDepenseActions.setPrevSoldCaisse(soldCaisse - (totalDette + totalSortieCaisse)));
            //set total SoldCaisse EntreeCaisse
            const saveTotalSoldCaisse = totalEntreeCaisse + prevSoldCaisse
            dispatch(suiviDepenseActions.setTotalSoldCaisse(saveTotalSoldCaisse));
        };

    }, [data, prevSoldCaisse, totalDette, soldCaisse]);

    //side effect rendering the body of my table 
    const renderDataDisplay = useCallback(() => {
        if (data) {

            return data.map((el, index) => <EntreeCaisseComp key = {index}  index = {index} prev = {el} />);
        }
    },[data]);

    if (data) {
        
        if (data.length > 0) {

            return (
               <div>
                <h3>Entrée Caisse</h3>
                 <table>
                    <tbody>
                        {renderDataDisplay()}
                        <tr>
                            <th>Total Entrée</th>
                            <td> {totalEntreeCaisse} </td>
                        </tr>
                        <tr>
                            <th> Total Sold Caisse</th>
                            <td> {totalSoldCaisse} </td>
                        </tr>

                    </tbody>
                </table>
                { foundPrevSold && <>

                    <p> Le sold caisse du {prevYear}/{prevMonth}/{prevDay}, n'a pas été trouvé </p>
                    <label id = {'inputfromUser' + id}> S'il est existant veillez le taper</label>
                    <input 
                        type="number"
                        id = {'inputfromUser' + id}
                        placeholder="Tapez le precedent sold caisse"
                        defaultValue={prevSoldCaisse}
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
    }
}

