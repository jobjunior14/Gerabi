import React from "react";
import {useDispatch } from 'react-redux'
import { productActions } from "../../store/AllProductManager-slice";
import { alimProductActions } from "../../store/AllProductManagerAlim-slice";
import useParamsGetter from "../../reuseFunction/paramsGetter";
export default function AddProduct () {

    const dispatch = useDispatch();
    const {stateAction} = useParamsGetter();
    function add (){
        stateAction ? dispatch(productActions.addProduct()) : dispatch(alimProductActions.addProduct()) 
    };
    return (<button onClick={add}> Ajouter un produit</button>)
};