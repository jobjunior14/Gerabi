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
    return (
        <button 
            className="bg-gray-500 duration-200 text-gray-50 py-1 px-4 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 "
            onClick={add}> 
        Ajouter un produit</button>
    )
};