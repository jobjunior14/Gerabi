import React from "react";
import { useDispatch } from 'react-redux';
import { productActions } from '../../../store/AllProductManager-slice.js';
const {tbaleTh} = require ('./css.js');

export default function InputsTh (props) {

    const dispatch = useDispatch();


    return (
        <>
            <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi1.name}
                    name = 'suivi1'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>

            <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi2.name}
                    name = 'suivi2'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>

            <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi3.name}
                    name = 'suivi3'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>

            { props.providers >= 4 && <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi4.name}
                    name = 'suivi4'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
            
            { props.providers >= 5 && <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi5.name}
                    name = 'suivi5'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
            { props.providers >= 6 && <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi6.name}
                    name = 'suivi6'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
            
            { props.providers >= 7 && <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi7.name}
                    name = 'suivi7'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
            { props.providers >= 8 && <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi8.name}
                    name = 'suivi8'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
            { props.providers >= 9 && <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi9.name}
                    name = 'suivi9'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
            { props.providers >= 10 && <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi10.name}
                    name = 'suivi10'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
            { props.providers >= 11 && <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi11.name}
                    name = 'suivi11'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
            { props.providers >= 12 && <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi12.name}
                    name = 'suivi12'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
            { props.providers >= 13 && <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi13.name}
                    name = 'suivi13'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
            { props.providers >= 14 && <th colSpan={2} style={tbaleTh} >
                <input
                    defaultValue={props.data.suivi14.name}
                    name = 'suivi14'
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
        </>


    )
}