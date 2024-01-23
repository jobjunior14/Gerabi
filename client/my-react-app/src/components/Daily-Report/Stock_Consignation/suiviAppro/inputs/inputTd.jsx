/* eslint-disable react/prop-types */
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { productActions } from '../../../../store/AllProductManager-slice';

export default function InputTd (props) {
    const dispatch = useDispatch();
    const id = useId ();

    return (
        <tr>
            <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.name}</td>
            <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.achat_journalier.prix_achat_gros} </td>
            <td className="border-2 border-gray-800 dark:text-gray-50">  {props.prev.achat_journalier.nbr_btll }</td>
            <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi1.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id + id + 'suivi1.qt_caisse'}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi1'}));
                    }}
                />
            </td>
            <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi1.valeur} </td>

            <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi2.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id + id + "suivi2.qt_caisse"}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi2'}));
                    }}
                />
            </td>
            <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi2.valeur} </td>
            
            <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi3.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id + id + "suivi3.qt_caisse"}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi3'}))
                    }}
                />
            </td>
            <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi3.valeur} </td>

            { props.providers >= 4 && <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi4.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id + id + 'suivi4.qt_caisse'}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi4'}));
                    }}
                />
            </td>}
            { props.providers >= 4 && <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi4.valeur} </td>}

            { props.providers >= 5 && <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi5.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id + id + 'suivi5.qt_caisse'}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi5'}));
                    }}
                />
            </td>}
            { props.providers >= 5 && <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi5.valeur} </td>}

            { props.providers >= 6 && <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi6.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id + id + 'suivi6.qt_caisse'}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi6'}));
                    }}
                />
            </td>}
           { props.providers >= 6 && <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi6.valeur} </td>}

            { props.providers >= 7 && <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi7.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id + id + 'suivi7.qt_caisse'}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi7'}))
                    }}
                />
            </td>}
            { props.providers >= 7 && <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi7.valeur} </td>}

            { props.providers >= 8 && <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi8.qt_caisse}
                    name = {'qt_caisse'}
                    id = {props.prev.id + id + 'suivi8.qt_caisse'}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi8'}));
                    }}
                />
            </td>}
            { props.providers >= 8 && <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi8.valeur} </td>}

            { props.providers >= 9 && <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi9.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev.id + id + 'suivi9.qt_caisse'}                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi9'}));
                    }}
                />
            </td>}
           { props.providers >= 9 && <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi9.valeur} </td>}

            { props.providers >= 10 && <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi10.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev.id + id + 'suivi10.qt_caisse'}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi10'}));
                    }}
                />
            </td>}
            { props.providers >= 10 && <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi10.valeur} </td>}

            { props.providers >= 11 && <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi11.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev.id + id + 'suivi11.qt_caisse'}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi11'}));
                    }}
                />
            </td>}
            { props.providers >= 11 && <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi11.valeur} </td>}

           {props.providers >= 12 && <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi12.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev.id + id + 'suivi12.qt_caisse'}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi12'}));
                    }}
                />
            </td>}
            { props.providers >= 12 && <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi12.valeur} </td>}
        
            { props.providers >= 13 && <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi13.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev.id + id + 'suivi13.qt_caisse'}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi13'}));
                    }}
                />
            </td>}
            { props.providers >= 13 &&<td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi13.valeur} </td>}
        
            {props.providers >= 14 && <td className="border-2 border-gray-800 dark:text-gray-50" >
                <input
                    className="w-32 rounded-md dark:text-gray-50 dark:bg-gray-800 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 "  
                    value={props.prev.suivi14.qt_caisse}
                    name = {"qt_caisse"}
                    id = {props.prev.id + id + 'suivi14.qt_caisse'}
                    placeholder= {'Quantiter caisse'}
                    onChange={ (e) => {
                        const {name, value} = e.target;
                        dispatch (productActions.handleTdFormInSuivi ({id: props.prev.id, name: name, value: value, path: 'suivi14'}));
                    }}
                />
            </td>}
            { props.providers >= 14 && <td className="border-2 border-gray-800 dark:text-gray-50"> {props.prev.suivi14.valeur} </td>}

        </tr>
    )
}