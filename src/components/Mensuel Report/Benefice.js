import React,{useState, useEffect} from "react";
import { LibelCostTable } from "./Libel-Cost-General/libel-cost";

const dataProv = 
[
    { name: 'Bralima', date: '15', amount: 2000, check: false, id: 0 },
    { name: 'Brasimba', date: '12', amount: 2450, check: false, id: 1 },
    { name: 'Autre produits', date: '4', amount: 1500, check: false, id: 2 },
    { name: 'Total Vente Systeme', date: '4', amount: 1500, check: false, id: 3 }
];
let total = 0;
for ( let i of dataProv)
{
    total += i.amount;
}

export function Vente_Bar ()
{

    const [barData, setBarData] = useState (dataProv);

    function Updating_Form (id, name, value, type, checked)
    {
        setBarData  (
            prev => {
                return prev.map ( (data) => 
                {
                    return data.id === id ? {...data, [name]: type === 'checkbox' ? checked : value} : data 
                })
            }
        ); 
    };


    let displayData = barData.map 
    (
        prev => {
            return  (
                <LibelCostTable 
                    prev = { prev }
                    key = { prev.id}
                    onchange = { Updating_Form}
                />
            )
        }
    )
    
    return (
        <table>
            <tr>
                <th> libellé </th>
                <th> Montant </th>
            </tr>
            {displayData}
        </table>
    )
}