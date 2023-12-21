import React from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../store/AllProductManager-slice";
import { suiviDepenseActions } from "../store/suiviDepense-slice";
import { suiviDetteActions } from "../store/suiviDette-slice";
import { mensRapportActions } from "../store/mensRepport-slice";

export default function DailyFilter ({prev, component}) {

    const dispatch = useDispatch();
        
    return (
        <div>
            <label>Année </label>
            <input 
                value={prev.year}
                name = 'year'
                placeholder= "Taper l'année"
                onChange= { e => {
                    const {name, value} = e.target;
                    component === 'allProduct' ? dispatch(productActions.setDate({name: name, value: Number (value)})) : 
                    component ==='suiviDepense' ? dispatch(suiviDepenseActions.setDate({name: name, value: Number (value)})) : 
                    component === 'daily' ? dispatch(mensRapportActions.setDate({name: name, value: Number (value)})) :
                    dispatch(suiviDetteActions.setDate({name: name, value: Number (value)}));
                }}
            />

            <label> Mois </label>
            <input 
                value={prev.month}
                name = 'month'
                placeholder= "Taper l'année"
                onChange= { e => {
                    const {name, value} = e.target;
                    component === 'allProduct' ? dispatch(productActions.setDate({name: name, value: Number (value)})) : 
                    component ==='suiviDepense' ? dispatch(suiviDepenseActions.setDate({name: name, value: Number (value)})) : 
                    component === 'daily' ? dispatch(mensRapportActions.setDate({name: name, value: Number (value)})) :
                    dispatch(suiviDetteActions.setDate({name: name, value: Number (value)}));
                }}
            />

            <label> Jour </label>
            <input 
                value={prev.day}
                name = 'day'
                placeholder= "Taper l'année"
                onChange= { e => {
                    const {name, value} = e.target;
                    component === 'allProduct' ? dispatch(productActions.setDate({name: name, value: Number (value)})) : 
                    component ==='suiviDepense' ? dispatch(suiviDepenseActions.setDate({name: name, value: Number (value)})) : 
                    component === 'daily' ? dispatch(mensRapportActions.setDate({name: name, value: Number (value)})) :
                    dispatch(suiviDetteActions.setDate({name: name, value: Number (value)}));
                }}
            />

            <button onClick={onclick} > Chercher </button>
        </div>
    );

}