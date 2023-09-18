
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { Pages } from '../../filter/pagination';

export function MonthMensRep ()
{

    const params = useParams ();
    console.log (params);

    return (
        <div>
            <h1> hey Month Data </h1>
        </div>
    )
}