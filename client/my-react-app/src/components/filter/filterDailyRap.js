import React from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../store/AllProductManager-slice";

export default function DailyFilter (props) {
    const dispatch = useDispatch();

    if (props.mens) {

        return (
            <div>
                <label> Année</label>
                <input 
                    defaultValue={props.prev.year}
                    name = 'year'
                    placeholder= "Taper l'année"
                    onChange= { e => {
                        const {name, value} = e.target;
                        return dispatch(productActions.setDate({name: name, value: value}));
                    }}
                />

                <label> Mois </label>
                <input 
                    defaultValue={props.prev.month}
                    name = 'month'
                    placeholder= "Taper l'année"
                    onChange= { e => {
                        const {name, value} = e.target;
                        return dispatch(productActions.setDate({name: name, value: value}));
                    }}
                />

                <button onClick={props.onclick}>Chercher</button>
            </div>
        );
    } else {

        return (
            <div>
                <label>Année </label>
                <input 
                    defaultValue={props.prev.year}
                    name = 'year'
                    placeholder= "Taper l'année"
                    onChange= { e => {
                        const {name, value} = e.target;
                        return dispatch(productActions.setDate({name: name, value: value}));
                    }}
                />

                <label> Mois </label>
                <input 
                    defaultValue={props.prev.month}
                    name = 'month'
                    placeholder= "Taper l'année"
                    onChange= { e => {
                        const {name, value} = e.target;
                        return dispatch(productActions.setDate({name: name, value: value}));
                    }}
                />

                <label> Jour </label>
                <input 
                    defaultValue={props.prev.day}
                    name = 'day'
                    placeholder= "Taper l'année"
                    onChange= { e => {
                        const {name, value} = e.target;
                        return dispatch(productActions.setDate({name: name, value: value}));
                    }}
                />

                <button onClick={props.onclick} > Chercher </button>
            </div>
        );

    }

}