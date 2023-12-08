import React from "react";
import {useDispatch, useSelector } from 'react-redux'
import { productActions } from "../../store/AllProductManager-slice";
import { alimProductActions } from "../../store/AllProductManagerAlim-slice";

export default function AddProduct (props) {

    const dispatch = useDispatch();
    const stateAction = useSelector (state => state.product.product);
    function add (){
        stateAction ? dispatch(productActions.addProduct()) : dispatch(alimProductActions.addProduct()) 
    };
    return (<button onClick={add}> Ajouter un produit</button>)
};