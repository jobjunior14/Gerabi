import React from "react";
import EntreeCaisseComp from "./components/entreeCaisseComp";
import { useSelector, useDispatch } from "react-redux";
import { suiviDepenseActions } from "../../../store/suiviDepense-slice";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function EntreeCaisse (props){

    const dispatch = useDispatch ();
    const data = useSelector(state => state.suiviDepense.entreeCaisse);
    let totalEntreeCaisse = 0;
    const prevSoldCaisse = useSelector(state => state.suiviDepense.prevSoldCaisse);
    const readOnly = useSelector (state => state.suiviDepense.readOnly);

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


    //message and input fields if prevSold is not found
    const [foundPrevSold, setFoundPrevSold] = useState(false);

    useEffect(() => {

        const fecthData = async () => {

            const prevSuiviDepenseData = await axios.get (`http://localhost:5001/api/v1/${props.componentName}/suiviDepense/rapportJournalier/${prevYear}/${prevMonth}/${prevDay}`);
            
            if (!prevSuiviDepenseData.data.data.soldCaisse) {
                
                setFoundPrevSold(prev => prev = true);
                dispatch(suiviDepenseActions.setPrevSoldCaisse(soldCaisse - (totalDette + totalSortieCaisse)));
            } else {

                dispatch(suiviDepenseActions.setPrevSoldCaisse(prevSuiviDepenseData.data.data.soldCaisse.amount));
                
            };
        }; fecthData();
    }, [prevDay, prevMonth, prevYear]);

    //map the data 
    let dataDisplay  = null;
    if ( data) {

        dataDisplay = data.map((el, index) => <EntreeCaisseComp key = {index}  index = {index} prev = {el} />);

        //calculate the total amount in entree caisse
        for (let i of data) {

            if (i.name !== "" && i.data.amount !== "") {

                totalEntreeCaisse += i.data.amount;
            };
        };

        //set total SoldCaisse EntreeCaisse
        dispatch(suiviDepenseActions.setTotalSoldCaisse(totalEntreeCaisse + prevSoldCaisse));
        
    };

    if (data) {
        
        if (data.length > 0) {

            return (
               <div>
                <h3>Entrée Caisse</h3>
                 <table>
                    <tbody>
                        {dataDisplay}
                        <tr>
                            <th>Total Entrée</th>
                            <td> {totalEntreeCaisse} </td>
                        </tr>
                        <tr>
                            <th> Total Sold Caisse</th>
                            <td> {Number (prevSoldCaisse) + Number (totalEntreeCaisse)} </td>
                        </tr>

                    </tbody>
                </table>
                { foundPrevSold && <>

                    <p> Le sold caisse du {prevYear}/{prevMonth}/{prevDay}, n'a pas été trouvé </p>
                    <label> S'il est existant veillez le taper</label>
                    <input 
                        type="number"
                        placeholder="Tapez le sold caisse"
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

