import React from 'react'
import { useEffect } from 'react';





export function TableSuivi (props) {
    
    const {table, tbaleTh, tableTd} = require ('./css.js')
    
    const product = ['tembo', '33export', 'primus', 'grand', 'petit', 'kkkk'];
    
    const data = [
        {
            name: 'Brasimba',
            data: []
        },
        
        {
            name: 'Bralima'
        },

        {
            name: 'Njabuka' 
        },

        {
            name: '    chr'
        }
    ];
    
    const th2  = [];
    const a = data.map( (el, index) => {
    
        th2.push (
            <th style={tbaleTh}> Quantié </th>
           );
           th2.push (
            <th style={tbaleTh}>Valeur</th>
           )
        return (
                <th colSpan= {2} style={tbaleTh}> {el.name} </th>
        )
    });
    
    
    
    const c = []
    data.map ( el => {
        c.push (<td> Hey </td>)
        c.push (<td>.... </td>)
        return null;
    });
    
    const b = product.map ( (el, index) => {
        return (
            <tr>
                <td>{el} </td>
                <td> 3100</td>
                <td>12</td>
                {c}
            </tr>
        )
    });
    return (
        <table className='table1' style={table}>
            <thead>
                <tr>
                    <th rowspan= '2' style={tbaleTh}> Produit </th>
                    <th rowspan= '2' style={tbaleTh}> Prix Achat Gros </th>
                    <th rowspan= '2' style={tbaleTh}> Nbr Btll </th>
                    {a}
                </tr>
                <tr>
                    {th2}
                </tr>
                {b}
            </thead>
            
        </table>
    )
}