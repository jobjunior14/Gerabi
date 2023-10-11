import { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import {Year} from '../../filter/yearsButton';
import { Filter } from '../../filter/filterMonthRap';


export default function MensualRapHome()
{
    const a = new Date().toLocaleDateString().slice(6);

    const annee = [{id: 0, data: a}, {id: 1, data: a - 1}, {id: 2, data: a - 2} ];
    
    const [searchFilter, setsearchFilter] = useState({ year: '', month: ''});

    // const [data, setData] = useState([]);

    
    function onChangeYearMonth (name, value )
    {        
        setsearchFilter (
            prev =>
            {
                return {...prev, [name]: value}
            }
        );
    };

    // to work////////////////////////////////////
    function onButton(e)
    {
        if ( searchFilter.year !== '' && searchFilter.month === '')
        {
            <Link to = {`/rapportMensuel/annee?date=${searchFilter.year}`}></Link>
        }
    };




    
        
    //Lien a modifier/////////////////////////////////
    const Yeardata = annee.map ( el => <div key = {el.id}> <Link to = {`/rapportMensuel/${el.data}`}> <Year key = {el.id} data = {el.data}/> </Link></div> );

    
    return (
        <div>
            <Filter onchange = {onChangeYearMonth} onclick = {onButton} valeur = {searchFilter}/>
            {Yeardata}
            <Outlet/>
        </div>
    )
}