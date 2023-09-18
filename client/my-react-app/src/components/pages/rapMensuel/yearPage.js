
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { Pages } from '../../filter/pagination';

export function YearMensRep ()
{
    const m = 
    [
        {
            id: 0,
            data: 1
        },
        {
            id: 1,
            data: 2
        },
        {
            id: 2,
            data: 3
        },
        {
            id: 3,
            data: 4
        },
        {
            id: 4,
            data: 5
        },
        {
            id: 5,
            data: 6
        },
        {
            id: 6,
            data: 7
        },
        {
            id: 7,
            data: 8
        },
        {
            id: 8,
            data: 9
        },
        {
            id: 9,
            data: 10
        },
        {
            id: 10,
            data: 11
        },
        {
            id: 11,
            data: 12
        }
    ];

    const params = useParams ();

    function onButton ()
    {

    }
    const displayPages = m.map (
        el =>
        {
            return <div key = {el.id}> <Link to = {`/rapportMensuel/${params.year}/${el.data}`}><Pages data = {el.data}/> </Link> </div>
        }
    ) 
    return (
        <div>
           {displayPages}
        </div>
    )
}