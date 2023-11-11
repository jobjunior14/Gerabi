import React from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../store/AllProductManager-slice";
import { suiviDepenseActions } from "../store/suiviDepense-slice";
import { suiviDetteActions } from "../store/suiviDette-slice";

export default function DailyFilter (props) {

    const dispatch = useDispatch();
        
    return (
        <div>
            <label>Année </label>
            <input 
                defaultValue={props.prev.year}
                name = 'year'
                placeholder= "Taper l'année"
                onChange= { e => {
                    const {name, value} = e.target;
                    props.component === 'allProduct' ? dispatch(productActions.setDate({name: name, value: Number (value)})) : 'suiviDepense' ? dispatch(suiviDepenseActions.setDate({name: name, value: Number (value)})) : dispatch(suiviDetteActions.setDate({name: name, value: Number (value)}));
                }}
            />

            <label> Mois </label>
            <input 
                defaultValue={props.prev.month}
                name = 'month'
                placeholder= "Taper l'année"
                onChange= { e => {
                    const {name, value} = e.target;
                    props.component === 'allProduct' ? dispatch(productActions.setDate({name: name, value: Number (value)})) : 'suiviDepense' ? dispatch(suiviDepenseActions.setDate({name: name, value: Number (value)})) : dispatch(suiviDetteActions.setDate({name: name, value: Number (value)}));
                }}
            />

            <label> Jour </label>
            <input 
                defaultValue={props.prev.day}
                name = 'day'
                placeholder= "Taper l'année"
                onChange= { e => {
                    const {name, value} = e.target;
                    props.component === 'allProduct' ? dispatch(productActions.setDate({name: name, value: Number (value)})) : 'suiviDepense' ? dispatch(suiviDepenseActions.setDate({name: name, value: Number (value)})) : dispatch(suiviDetteActions.setDate({name: name, value: Number (value)}));
                }}
            />

            <button onClick={props.onclick} > Chercher </button>
        </div>
    );

}