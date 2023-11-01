import React from 'react'
import { useDispatch } from 'react-redux';
import { suiviDepenseActions } from '../../../store/suiviDepense-slice';

export default function EntreeCaisseComp (props){

    const dispacth = useDispatch();

    return (<tr>
      <th>
        <input
            defaultValue={props.prev.name}
            id = { props.prev.id}
            name = 'name'
            type= 'text'
            placeholder='Taper Le Libelé'
            onChange={ (e) => {
                const {name, value, id} = e.target;
                dispacth(suiviDepenseActions.HandleEntreeCaisse({name: name, value: value, id: id}));
            }}
        />
      </th>

      <td>
        <input
            defaultValue={props.prev.data.amount}
            id = { props.prev.id}
            name = 'amount'
            type= 'text'
            placeholder='Taper Le Libelé'
            onChange={ (e) => {
                const {name, value, id} = e.target;
                dispacth(suiviDepenseActions.HandleEntreeCaisse({name: name, value: value, id: id}));
            }}
        />
      </td>
    </tr>)

}