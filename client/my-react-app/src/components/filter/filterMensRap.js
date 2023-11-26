import React from "react";
import { useDispatch } from "react-redux";
import { mensRapportActions } from "../store/mensRepport-slice";

export default function MensFilter (props) {
    const dispatch = useDispatch();
        
    return (
        <div>
            <label> Année</label>
            <input 
                value={props.prev.year}
                name = 'year'
                placeholder= "Taper l'année"
                onChange= { e => {
                    const {name, value} = e.target;
                    dispatch(mensRapportActions.setDate({name: name, value: value}));
                }}
            />

            <label> Mois </label>
            <input 
                value={props.prev.month}
                name = 'month'
                placeholder= "Taper l'année"
                onChange= { e => {
                    const {name, value} = e.target;
                    dispatch(mensRapportActions.setDate({name: name, value: value}));
                }}
            />

            <button onClick={props.onclick}>Chercher</button>
        </div>
    );
   

}