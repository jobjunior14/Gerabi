import React, { useState } from 'react'
import { useEffect } from 'react';



export function TableSuivi (props) {
    
    const {table, tbaleTh, tableTd} = require ('./css.js');

    const [t, setT] = useState ([[{name: 'bralima', qt: 12, valeur: 2340}]])

   const data = [
    {
        name: 'tembo',
        qt_btll: 12,
        prixAchat: 4300,
    },

    {
        name: 'Primus',
        qt_btll: 12,
        prixAchat: 4300,

    }
   ];
   
    
   
    return (
        <table className='table1' style={table}>
            <thead>
                <tr>
                    <th rowspan= '2' style={tbaleTh}> Produit </th>
                    <th rowspan= '2' style={tbaleTh}> Prix Achat Gros </th>
                    <th rowspan= '2' style={tbaleTh}> Nbr Btll </th>
                    <th colSpan={2} style={tbaleTh}> <input value={'Brasimba'}/> </th>
                    <th colSpan={2} style={tbaleTh}> <input value={'Brasimba'}/> </th>
                    <th colSpan={2} style={tbaleTh}> <input value={'Brasimba'}/> </th>
                    <th colSpan={2} style={tbaleTh}> <input value={'Brasimba'}/> </th>
                    <th colSpan={2} style={tbaleTh}> <input value={'Brasimba'}/> </th>
                    <th colSpan={2} style={tbaleTh}> <input value={'Brasimba'}/> </th>
                    <th colSpan={2} style={tbaleTh}> <input value={'Brasimba'}/> </th>
                    <th colSpan={2} style={tbaleTh}> <input value={'Brasimba'}/> </th>
                    <th colSpan={2} style={tbaleTh}> <input value={'Brasimba'}/> </th>
                    <th colSpan={2} style={tbaleTh}> <input value={'Brasimba'}/> </th>
                   

                </tr>
                <tr>
                    <th style={tbaleTh}> Qt caisses</th>
                    <th style={tbaleTh}> Valeur </th>

                    <th style={tbaleTh}> Qt caisses</th>
                    <th style={tbaleTh}> Valeur </th>

                    <th style={tbaleTh}> Qt caisses</th>
                    <th style={tbaleTh}> Valeur </th>

                    <th style={tbaleTh}> Qt caisses</th>
                    <th style={tbaleTh}> Valeur </th>

                    <th style={tbaleTh}> Qt caisses</th>
                    <th style={tbaleTh}> Valeur </th>

                    <th style={tbaleTh}> Qt caisses</th>
                    <th style={tbaleTh}> Valeur </th>

                    <th style={tbaleTh}> Qt caisses</th>
                    <th style={tbaleTh}> Valeur </th>

                    <th style={tbaleTh}> Qt caisses</th>
                    <th style={tbaleTh}> Valeur </th>

                    <th style={tbaleTh}> Qt caisses</th>
                    <th style={tbaleTh}> Valeur </th>

                    <th style={tbaleTh}> Qt caisses</th>
                    <th style={tbaleTh}> Valeur </th>

                    

                   
                </tr>
                {}
            </thead>
            
        </table>
    )
}