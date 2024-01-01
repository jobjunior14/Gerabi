import SuiviDesVentes from "./suivi_Des_Ventes/suiviDesVentes"
import MensFilter from "../filter/filterMensRap";
import MensRapSuiviDepense from "./suivi_depense/suiviDepenseMens";
import DailyFilter from "../filter/filterDailyRap";
import useDateParams from "../reuseFunction/dateParams";
import { useState } from "react";
export function MensRepport ({user}) {
    //date's query params
    const {year,month, day, setterDateParams} = useDateParams();

    //date in fields 
    const [date, setDate] = useState({year, month, day});

    function handleDate (name, value) {
        setDate (prev => ({...prev, [name]: Number (value)}));
    }
    
    //a fucntion we're gonna pass to the date controller filds cause 
    //it's using a dispatch method 
    function setFilterParams() {
        setterDateParams(date);
    };

    return (
        <div >
            {user === 'rappMens' ? <MensFilter prev = {date} onclick={setFilterParams} onchange={handleDate} /> : <DailyFilter prev = {date} onclick = {setFilterParams}  onchange={handleDate}/>}
            <SuiviDesVentes  user = {user}/>
            <MensRapSuiviDepense user = {user}/>
        </div>
    );
}