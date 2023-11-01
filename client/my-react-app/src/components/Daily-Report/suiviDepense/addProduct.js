import React from "react";
import {useDispatch } from 'react-redux'
import { suiviDepenseActions } from "../../store/suiviDepense-slice";

export default function AddProduct () {

    const dispatch = useDispatch()
    return (<button onClick={() => dispatch(suiviDepenseActions.addProductEntreeCaisse())}> Ajouter un produit</button>)

}