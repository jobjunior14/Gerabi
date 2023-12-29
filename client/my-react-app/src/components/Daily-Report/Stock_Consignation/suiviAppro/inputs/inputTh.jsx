import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../../../store/AllProductManager-slice';
import { useId } from "react";

export default function InputsTh (props) {

    const dispatch = useDispatch();
    const readOnly = useSelector (state => state.product.readOnly);
    const productData = useSelector (state => state.product.productData);
    const id = useId();

    return (
        <>
             <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi1.name}
                    name = 'suivi1'
                    id = {'suivi1' + id}
                    readOnly = {readOnly}
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>

             <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi2.name}
                    name = 'suivi2'
                    id = {'suivi2' + id}
                    readOnly = {readOnly}
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>

             <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi3.name}
                    name = 'suivi3'
                    id = {'suivi3' + id}
                    readOnly = {readOnly}
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>

             { props.providers >= 4 && <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi4.name}
                    name = 'suivi4'
                    id = {'suivi4' + id}
                    readOnly = {readOnly}
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
            
             { props.providers >= 5 && <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi5.name}
                    name = 'suivi5'
                    id = {'suivi5' + id}
                    readOnly = {readOnly}
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
             { props.providers >= 6 && <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi6.name}
                    name = 'suivi6'
                    id = {'suivi6' + id}
                    readOnly = {readOnly}
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
            
             { props.providers >= 7 && <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi7.name}
                    name = 'suivi7'
                    id = {'suivi7' + id}
                    readOnly = {readOnly}
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
             { props.providers >= 8 && <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi8.name}
                    name = 'suivi8'
                    id = {'suivi8' + id}
                    readOnly = {readOnly}
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
             { props.providers >= 9 && <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi9.name}
                    name = 'suivi9'
                    id = {'suivi9' + id}
                    readOnly = {readOnly}
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
             { props.providers >= 10 && <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi10.name}
                    name = 'suivi10'
                    id = {'suivi10' + id}
                    readOnly = {readOnly}
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
             { props.providers >= 11 && <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi11.name}
                    name = 'suivi11'
                    id = {'suivi11' + id}
                    readOnly = {readOnly}
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
             { props.providers >= 12 && <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi12.name}
                    name = 'suivi12'
                    id = {'suivi12' + id}
                    readOnly = {readOnly}
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
             { props.providers >= 13 && <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi13.name}
                    name = 'suivi13'
                    id = {'suivi13' + id}
                    readOnly = {readOnly}
                    placeholder= {"Nom du fournisseur"}
                    onChange={ (e) => {
                        const {name, value } = e.target;
                        dispatch(productActions.handleThFormInSuivi ( {name: name, value: value}));
                    }}
                />
            </th>}
                
             { props.providers >= 14 && <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900" colSpan={2}  >
                <input
                    className="w-32 rounded-md bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                    value={productData[0].suivi14.name}
                    name = 'suivi14'
                    id = {'suivi14' + id}
                    readOnly = {readOnly}
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