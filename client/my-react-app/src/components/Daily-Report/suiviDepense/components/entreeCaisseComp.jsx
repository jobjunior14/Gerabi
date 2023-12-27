import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { suiviDepenseActions } from '../../../store/suiviDepense-slice';

export default function EntreeCaisseComp (props){

    const dispatch = useDispatch();
    const readOnly = useSelector (state => state.suiviDepense.readOnly);

    return (<tr>
      <th>
        <input
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
      </th>

      <td>
        <input
            value={props.prev.data.amount}
            id = { props.prev.id}
            name = 'amount'
            type= 'number'
            placeholder='Taper Le montant'
            onChange={ (e) => {
                const {name, value, id} = e.target;
                dispatch(suiviDepenseActions.HandleEntreeCaisse({name: name, value: Number (value), index: props.index}));
            }}
        />
      </td>
    </tr>)

}