import React from "react";
import EntreeCaisseComp from "./components/entreeCaisseComp";
import { useSelector } from "react-redux";

export default function EntreeCaisse (){

    const data = useSelector(state => state.suiviDepense.entreeCaisse);

    let dataDisplay  = null;
    if ( data) {

        dataDisplay = data.map(el => <EntreeCaisseComp prev = {el} />)

    };

    if (data) {
        
        if (data.length > 0) {

            return (
                <table>
                    {dataDisplay}
                </table>
            )
        } else {
            <h4> Ouuups!! cette date n'a pas de donnee</h4>
        }
    } else {
        <h4> Chargement....</h4>
    }
}

