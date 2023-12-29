import React from "react";
import { useDispatch } from "react-redux";
import { mensRapportActions } from "../store/mensRepport-slice";

export default function MensFilter (props) {
    const dispatch = useDispatch();
        
    return (
        <div className=" flex items-center justify-center mb-5 mt-8">
            <div className="relative">

                <label className=" absolute bottom-7 z-40 bg-gray-100 left-4 rounded-full text-ms"> Année</label>
                <input
                    className="w-16 mx-2 h-10 pl-2 bg-gray-100 appearance-none border-2 border-gray-400 rounded-md focus:outline-none focus:border-indigo-500 focus:border-2 duration-200"
                    value={props.prev.year}
                    name = 'year'
                    type="number"
                    placeholder= "Taper l'année"
                    onChange= { e => {
                        const {name, value} = e.target;
                        dispatch(mensRapportActions.setDate({name: name, value: Number (value)}));
                    }}
                />
            </div>
            <div className="relative">

                <label className=" absolute bottom-7 z-40 bg-gray-100 left-4 rounded-full text-ms"> Mois </label>
                <input
                    className="w-16 mx-2 h-10 pl-2 bg-gray-100 appearance-none border-2 border-gray-400 rounded-md focus:outline-none focus:border-indigo-500 focus:border-2 duration-200" 
                    value={props.prev.month}
                    name = 'month'
                    type="number"
                    placeholder= "Taper l'année"
                    onChange= { e => {
                        const {name, value} = e.target;
                        dispatch(mensRapportActions.setDate({name: name, value: Number (value)}));
                    }}
                />
            </div>


            <button 
                className="bg-gray-500 duration-200 text-gray-50 p-2 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 "
                onClick={props.onclick}
            >Chercher</button>
        </div>
    );
   

}