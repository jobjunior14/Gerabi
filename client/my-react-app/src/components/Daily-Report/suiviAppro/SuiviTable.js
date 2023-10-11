import React, { useState } from 'react'
import InputsTh from './inputs/inputTh.js';
import InputsTh2 from './inputs/inputTh2.js';
import { Bralima } from '../Bralima.js';


export function TableSuivi (props) {
    
    const {table, tbaleTh} = require ('./css.js');
   

    return (
        <table className='table1' style={table}>
            <thead>
                <tr>
                    <th rowSpan= '2' style={tbaleTh}> Produit </th>
                    <th rowSpan= '2' style={tbaleTh}> Prix Achat Gros  </th>
                    <th rowSpan= '2' style={tbaleTh}> Nbr Btll  </th>
                    <InputsTh key  = {0} toggleSuivi = {props.toggleSuivi} onchange = {props.changeTh} data = {props.data[0]} />
                </tr>
                <InputsTh2 key = {1} toggleSuivi = {props.toggleSuivi} />
                {props.tdData}
            </thead>
            
        </table>
    )
}