import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VenteSystemGraph from "./yearStats/venteSystem/venteSysteme";
import axios from 'axios'

export default function YearStats (props) {

    const [dateParams, setDateParams] = useSearchParams();

    const year = dateParams.get('year');

    const [date, setDate] = useState(year);

    const currentYear = Number (new Date().getFullYear());


    function setFilterParams  () {
        setDateParams(prev => date);
    };

    function handleYear (e) {
        setDate (prev => e.target.value);
    }

    if (year > currentYear)  {

        return (
            <div>
                <h1>Oooops vous ne pouvez demender une date supperieure </h1>
            </div>
        )
    } else {
        <div>
            <label id = 'annee'>Année</label>
            <input id = 'annee' type="number" defaultValue={date} onChange={handleYear} placeholder="Taper l'année" />
            <VenteSystemGraph/>
        </div>
    }

}