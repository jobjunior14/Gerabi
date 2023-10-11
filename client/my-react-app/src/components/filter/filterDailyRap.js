import React from "react";
// import { Link } from "react-router-dom";

export default function DailyFilter (props) {

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
                        return props.onchange (name, value);
                    }}
                />

                <label> Mois </label>
                <input 
                    defaultValue={props.prev.month}
                    name = 'month'
                    placeholder= "Taper l'année"
                    onChange= { e => {
                        const {name, value} = e.target;
                        return props.onchange (name, value);
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
                        return props.onchange (name, value);
                    }}
                />

                <label> Mois </label>
                <input 
                    defaultValue={props.prev.month}
                    name = 'month'
                    placeholder= "Taper l'année"
                    onChange= { e => {
                        const {name, value} = e.target;
                        return props.onchange (name, value);
                    }}
                />

                <label> Jour </label>
                <input 
                    defaultValue={props.prev.day}
                    name = 'day'
                    placeholder= "Taper l'année"
                    onChange= { e => {
                        const {name, value} = e.target;
                        return props.onchange (name, value);
                    }}
                />

                <button onClick={props.onclick} > Chercher </button>
            </div>
        );

    }

}