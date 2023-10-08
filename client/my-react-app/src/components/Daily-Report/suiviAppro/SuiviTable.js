import React, { useState } from 'react'
import InputsTh from './inputs/inputTh.js';
import InputsTh2 from './inputs/inputTh2.js';


export function TableSuivi (props) {
    
    const {table, tbaleTh} = require ('./css.js');

     const dataTh = [];
    
    if (props.data.length > 0 )
    {
       for (let i = 1; i <= 14; i++)
       {
          if ( i === 1) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi1.name} onchange = {props.changeTh}/>)
          }
          if ( i === 2) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi2.name} onchange = {props.changeTh}/>)
          }
          if ( i === 3) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi3.name} onchange = {props.changeTh}/>)
          }
          if ( i === 4) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi4.name} onchange = {props.changeTh}/>)
          }
          if ( i === 5) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi5.name} onchange = {props.changeTh}/>)
          }
          if ( i === 6) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi6.name} onchange = {props.changeTh}/>)
          }
          if ( i === 7) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi7.name} onchange = {props.changeTh}/>)
          }
          if ( i === 8) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi8.name} onchange = {props.changeTh}/>)
          }
          if ( i === 9) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi9.name} onchange = {props.changeTh}/>)
          }
          if ( i === 10) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi10.name} onchange = {props.changeTh}/>)
          }
          if ( i === 11) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi11.name} onchange = {props.changeTh}/>)
          }
          if ( i === 12) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi12.name} onchange = {props.changeTh}/>)
          }
          if ( i === 13) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi13.name} onchange = {props.changeTh}/>)
          }
          if ( i === 14) {
            dataTh.push (<InputsTh key={i} nameValue = {`suivi${i}`}  value={props.data[0].suivi14.name} onchange = {props.changeTh}/>)
          }
       }
    };

   

    return (
        <table className='table1' style={table}>
            <thead>
                <tr>
                    <th rowspan= '2' style={tbaleTh}> Produit </th>
                    <th rowspan= '2' style={tbaleTh}> Prix Achat Gros  </th>
                    <th rowspan= '2' style={tbaleTh}> Nbr Btll  </th>
                    {dataTh}
                </tr>
                <InputsTh2 />
                {props.tdData}
            </thead>
            
        </table>
    )
}