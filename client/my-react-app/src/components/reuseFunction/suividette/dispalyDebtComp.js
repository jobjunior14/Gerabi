import { useDispatch } from "react-redux";
import React from "react";
import { suiviDetteActions } from "../../store/suiviDette-slice";

export default function DebtDisplay(props) {

    const dispatch = useDispatch();

    return (
        <tr key = {props.tr}>
            <th> 
                <input 
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
                        dispatch(suiviDetteActions.HandleClients({name: name, value: value, index: props.index}));
                    }}
                />
            </th>
            <td>
                <input 
                    value={props.data.amount}
                    id = {props.index + props.id + props.in2}
                    type = 'number'
                    name = 'amount'
                    placeholder="Taper le montant de la dette"
                    onChange={(e) => {
                        const {name, value} = e.target;
                        props.component === 'musiciens' ? dispatch(suiviDetteActions.HandleMusiciens({name: name, value: Number (value), index: props.index})) : 
                        props.component === 'agents' ? dispatch(suiviDetteActions.HandleAgents({name: name, value: Number (value), index: props.index})) :
                        dispatch(suiviDetteActions.HandleClients({name: name, value: Number (value), index: props.index}));
                    }}
                />
            </td>
            <td>
                <input 
                    value={props.data.payment}
                    id = {props.index + props.id + props.in3}
                    type = 'number'
                    name = 'payment'
                    placeholder="Taper le montant payé"
                    onChange={(e) => {
                        const {name, value} = e.target;
                        props.component === 'musiciens' ? dispatch(suiviDetteActions.HandleMusiciens({name: name, value: Number (value), index: props.index})) : 
                        props.component === 'agents' ? dispatch(suiviDetteActions.HandleAgents({name: name, value: Number (value), index: props.index})) :
                        dispatch(suiviDetteActions.HandleClients({name: name, value: Number (value), index: props.index}));
                    }}
                />
            </td>
            <td>{props.totDebt}</td>
        </tr>
    )
}