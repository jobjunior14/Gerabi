import {useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { suiviDetteActions } from "../../store/suiviDette-slice";
import { useEffect } from "react";

export default function YourTotDetteDaily (props) {

    const yourTotDette = useSelector(state => state.suiviDette.yourTotalDette);
    const dispatch = useDispatch();
    //data 
    const fournisseurs = useSelector(state => state.suiviDette.fournisseurs);
   

    //side effect
    useEffect(() => {
        //calculate the totad debt daily
        if ( fournisseurs  ) {
            let tot = 0;
    
            for (let i of fournisseurs) {
                if (i.name !== "" ) {
                    tot += i.data.amount - i.data.payment;
                };
            };
            dispatch(suiviDetteActions.setYourTotalDette(tot));
        };

    }, [fournisseurs]);

    return (<p> Total dette du {props.day}-{props.month}-{props.year} : <b> {yourTotDette} </b> </p>)
};