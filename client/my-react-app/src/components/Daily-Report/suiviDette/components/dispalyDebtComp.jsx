/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import React from "react";
import { suiviDetteActions } from "../../../store/suiviDette-slice";

export default function DebtDisplay(props) {

    const dispatch = useDispatch();

    return (
        <tr className="[&>*:nth-child(even)]:bg-slate-200" key = {props.tr}>
            <td className="border-2 border-gray-800" key = {props.th}>  
                <input
                    className="w-32 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.name}
                    id = {props.index + props.id + props.in1}
                    type = 'text'
                    name = 'name'
                    readOnly = {props.readOnly}
                    placeholder="Taper le nom"
                    onChange={(e) => {
                        const {name, value} = e.target;
                        props.component === 'musiciens' ? dispatch(suiviDetteActions.HandleMusiciens({name: name, value: value, index: props.index})) : 
                        props.component === 'agents' ? dispatch(suiviDetteActions.HandleAgents({name: name, value: value, index: props.index})) :
                        props.component === 'clients' ?dispatch(suiviDetteActions.HandleClients({name: name, value: value, index: props.index})) :
                        dispatch(suiviDetteActions.HandleFournisseurs({name: name, value: value, index: props.index}));
                    }}
                />
            </td>
            <td className="border-2 border-gray-800">
                <input
                    className="w-32 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.data.amount}
                    id = {props.index + props.id + props.in2}
                    type = 'number'
                    name = 'amount'
                    placeholder="Taper le montant de la dette"
                    onChange={(e) => {
                        const {name, value} = e.target;
                        props.component === 'musiciens' ? dispatch(suiviDetteActions.HandleMusiciens({name: name, value: Number (value), index: props.index})) : 
                        props.component === 'agents' ? dispatch(suiviDetteActions.HandleAgents({name: name, value: Number (value), index: props.index})) :
                        props.component === 'clients' ?dispatch(suiviDetteActions.HandleClients({name: name, value: Number (value), index: props.index})) :
                        dispatch(suiviDetteActions.HandleFournisseurs({name: name, value: Number (value), index: props.index}));
                    }}
                />
            </td>
            <td className="border-2 border-gray-800">
                <input
                    className="w-32 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.data.payment}
                    id = {props.index + props.id + props.in3}
                    type = 'number'
                    name = 'payment'
                    placeholder="Taper le montant payé"
                    onChange={(e) => {
                        const {name, value} = e.target;
                        props.component === 'musiciens' ? dispatch(suiviDetteActions.HandleMusiciens({name: name, value: Number (value), index: props.index})) : 
                        props.component === 'agents' ? dispatch(suiviDetteActions.HandleAgents({name: name, value: Number (value), index: props.index})) :
                        props.component === 'clients' ?dispatch(suiviDetteActions.HandleClients({name: name, value: Number (value), index: props.index})) :
                        dispatch(suiviDetteActions.HandleFournisseurs({name: name, value: Number (value), index: props.index}));
                    }}
                />
            </td>
            <td className="border-2 border-gray-800">{props.totDebt}</td>
        </tr>
    )
}