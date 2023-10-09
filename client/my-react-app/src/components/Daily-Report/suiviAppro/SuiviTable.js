import React, { useState } from 'react'
import InputsTh from './inputs/inputTh.js';
import InputsTh2 from './inputs/inputTh2.js';
import { Bralima } from '../Bralima.js';


export function TableSuivi (props) {
    
    const {table, tbaleTh} = require ('./css.js');

    //  const dataTh = [];
    
    // if (props.data.length > 0 )
    // {
    //    for (let i = 1; i <= 14; i++)
    //    {
    //       dataTh.push ( props.toggleTd >= i &&<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0][`suivi${i}`]['name']} onchange = {props.changeTh}/>)
    //    }
    // };

   

    return (
        <table className='table1' style={table}>
            <thead>
                <tr>
                    <th rowSpan= '2' style={tbaleTh}> Produit </th>
                    <th rowSpan= '2' style={tbaleTh}> Prix Achat Gros  </th>
                    <th rowSpan= '2' style={tbaleTh}> Nbr Btll  </th>
                    <InputsTh toggleSuivi = {props.toggleSuivi} onchange = {props.changeTh} data = {props.data[0]} />
                </tr>
                <InputsTh2 toggleSuivi = {props.toggleSuivi} />
                {props.tdData}
            </thead>
            
        </table>
    )
}