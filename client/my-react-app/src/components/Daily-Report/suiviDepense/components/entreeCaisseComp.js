import React from 'react'
import { useDispatch } from 'react-redux';
import { suiviDepenseActions } from '../../../store/suiviDepense-slice';

export default function EntreeCaisseComp (props){

    const dispacth = useDispatch();

    return (<tr>
      <th>
        <input
            defaultValue={props.prev.name}
            id = { props.prev.index}
            name = 'name'
            type= 'text'
            placeholder='Taper Le Libelé'
            onChange={ (e) => {
                const {name, value} = e.target;
                dispacth(suiviDepenseActions.HandleEntreeCaisse({name: name, value: value, index: props.index}));
            }}
        />
      </th>

      <td>
        <input
            defaultValue={props.prev.data.amount}
            id = { props.prev.id}
            name = 'amount'
            type= 'number'
            placeholder='Taper Le Libelé'
            onChange={ (e) => {
                const {name, value, id} = e.target;
                dispacth(suiviDepenseActions.HandleEntreeCaisse({name: name, value: Number (value), index: id}));
            }}
        />
      </td>
    </tr>)

}