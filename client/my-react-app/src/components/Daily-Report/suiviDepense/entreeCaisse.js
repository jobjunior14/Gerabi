import React from "react";
import EntreeCaisseComp from "./components/entreeCaisseComp";
import { useSelector } from "react-redux";
import {useDispatch } from 'react-redux'
import { suiviDepenseActions } from "../../store/suiviDepense-slice";
export default function EntreeCaisse (){

    const dispatch = useDispatch ();
    const data = useSelector(state => state.suiviDepense.entreeCaisse);

    //map the data 
    let dataDisplay  = null;
    if ( data) {

        dataDisplay = data.map((el, index) => <EntreeCaisseComp key = {index}  index = {index} prev = {el} />)

    };

    
    if (data) {
        
        if (data.length > 0) {

            return (
               <div>
                 <table>
                    {dataDisplay}
                </table>

                <button onClick={() => dispatch(suiviDepenseActions.addProductEntreeCaisse())}> Ajouter un produit</button>               </div>
            )
        } else {
            <h4> Ouuups!! cette date n'a pas de donnee</h4>
        };
    } else {
        <h4> Chargement....</h4>
    }
}

