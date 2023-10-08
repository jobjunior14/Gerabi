import React from 'react';

export default function InputTd (props) {
    const {tableTd} = require ('./css.js');

    return (
        <tr>
            <td style={tableTd}> {props.prev.name}</td>
            <td style={tableTd}> {props.prev.achat_journalier.prix_achat_gros} </td>
            <td style={tableTd}>  {props.prev.achat_journalier.nbr_btll }</td>
            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi1.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, 'suivi1') ;
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi1.valeur} </td>

            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi2.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, 'suivi2');
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi2.valeur} </td>
            
            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi3.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, 'suivi3');
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi3.valeur} </td>

            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi4.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, 'suivi4');
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi4.valeur} </td>

            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi5.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, 'suivi5');
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi5.valeur} </td>

            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi6.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, 'suivi6');
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi6.valeur} </td>

            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi7.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, 'suivi7');
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi7.valeur} </td>

            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi8.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, "suivi8");
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi8.valeur} </td>

            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi9.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, 'suivi9');
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi9.valeur} </td>

            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi10.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, 'suivi10');
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi10.valeur} </td>

            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi11.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, 'suivi11');
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi11.valeur} </td>

            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi12.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, 'suivi12');
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi12.valeur} </td>
        
            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi13.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, 'suivi13');
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi13.valeur} </td>
        4
            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi14.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev._id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        return props.onchange( id, name, value, 'suivi14');
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi14.valeur} </td>

        </tr>
    )
}