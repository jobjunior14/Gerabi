import { useState } from "react";
import VenteSystemGraph from "./yearStats/venteSystem/venteSysteme";
import useDateParams from '../reuseFunction/dateParams'

export default function YearStats () {

    const {year, currentYear, setterDateParams} = useDateParams();

    const [date, setDate] = useState(year);

    function setFilterParams  () {
        setterDateParams(date);
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
        return (
            <div>
                <div>
                    <label id = 'annee'>Année</label>
                    <input id = 'annee' type="number" defaultValue={date} onChange={handleYear} placeholder="Taper l'année" />
                    <button onClick={setFilterParams}> Chercher</button>
                </div>
                <VenteSystemGraph/>
            </div>

        );
    }

}