/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { suiviDepenseActions } from '../../../store/suiviDepense-slice';

export default function EntreeCaisseComp (props){

    const dispatch = useDispatch();
    const readOnly = useSelector (state => state.suiviDepense.readOnly);

    const inputStyle = "w-32 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "
    return (<tr>
      <td className="border-2 border-gray-900">
        <input
            className={inputStyle} 
            value={props.prev.name}
            id = { props.prev.index}
            name = 'name'
            readOnly = {readOnly}
            type= 'text'
            placeholder='Taper Le Libelé'
            onChange={ (e) => {
                const {name, value} = e.target;
                dispatch(suiviDepenseActions.HandleEntreeCaisse({name: name, value: value, index: props.index}));
            }}
        />
      </td>

      <td className="border-2 border-gray-900">
        <input
            className={inputStyle} 
            value={props.prev.data.amount}
            id = { props.prev.id}
            name = 'amount'
            type= 'number'
            placeholder='Taper Le montant'
            onChange={ (e) => {
                const {name, value} = e.target;
                dispatch(suiviDepenseActions.HandleEntreeCaisse({name: name, value: Number (value), index: props.index}));
            }}
        />
      </td>
    </tr>)

}