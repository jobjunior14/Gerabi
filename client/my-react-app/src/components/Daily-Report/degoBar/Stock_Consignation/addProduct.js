import React from "react";
import {useDispatch } from 'react-redux'
import { productActions } from "../../store/AllProductManager-slice";

export default function AddProduct () {

    const dispatch = useDispatch()
    return (<button onClick={() => dispatch(productActions.addProduct())}> Ajouter un produit</button>)

}