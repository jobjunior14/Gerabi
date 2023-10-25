import React from 'react';
import { useDispatch } from 'react-redux';
import { productActions } from '../../../store/AllProductManager-slice.js';
const {tableTd} = require ('./css.js');

export default function InputTd (props) {


    const dispatch = useDispatch();
    

    return (
        <tr>
            <td style={tableTd}> {props.prev.name}</td>
            <td style={tableTd}> {props.prev.achat_journalier.prix_achat_gros} </td>
            <td style={tableTd}>  {props.prev.achat_journalier.nbr_btll }</td>
            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi1.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi1'}));
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi1.valeur} </td>

            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi2.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi2'}));
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi2.valeur} </td>
            
            <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi3.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi3'}))
                    }}
                />
            </td>
            <td style={tableTd}> {props.prev.suivi3.valeur} </td>

            { props.providers >= 4 && <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi4.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi4'}));
                    }}
                />
            </td>}
            { props.providers >= 4 && <td style={tableTd}> {props.prev.suivi4.valeur} </td>}

            { props.providers >= 5 && <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi5.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi5'}));
                    }}
                />
            </td>}
            { props.providers >= 5 && <td style={tableTd}> {props.prev.suivi5.valeur} </td>}

            { props.providers >= 6 && <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi6.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi6'}));
                    }}
                />
            </td>}
           { props.providers >= 6 && <td style={tableTd}> {props.prev.suivi6.valeur} </td>}

            { props.providers >= 7 && <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi7.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi7'}))
                    }}
                />
            </td>}
            { props.providers >= 7 && <td style={tableTd}> {props.prev.suivi7.valeur} </td>}

            { props.providers >= 8 && <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi8.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi8'}));
                    }}
                />
            </td>}
            { props.providers >= 8 && <td style={tableTd}> {props.prev.suivi8.valeur} </td>}

            { props.providers >= 9 && <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi9.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi9'}));
                    }}
                />
            </td>}
           { props.providers >= 9 && <td style={tableTd}> {props.prev.suivi9.valeur} </td>}

            { props.providers >= 10 && <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi10.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi10'}));
                    }}
                />
            </td>}
            { props.providers >= 10 && <td style={tableTd}> {props.prev.suivi10.valeur} </td>}

            { props.providers >= 11 && <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi11.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi11'}));
                    }}
                />
            </td>}
            { props.providers >= 11 && <td style={tableTd}> {props.prev.suivi11.valeur} </td>}

           {props.providers >= 12 && <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi12.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi12'}));
                    }}
                />
            </td>}
            { props.providers >= 12 && <td style={tableTd}> {props.prev.suivi12.valeur} </td>}
        
            { props.providers >= 13 && <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi13.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi13'}));
                    }}
                />
            </td>}
            { props.providers >= 13 &&<td style={tableTd}> {props.prev.suivi13.valeur} </td>}
        
            {props.providers >= 14 && <td style={ tableTd}>
                <input 
                    defaultValue={props.prev.suivi14.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev.id}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {id, name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: id, name: name, value: value, path: 'suivi14'}));
                    }}
                />
            </td>}
            { props.providers >= 14 && <td style={tableTd}> {props.prev.suivi14.valeur} </td>}

        </tr>
    )
}