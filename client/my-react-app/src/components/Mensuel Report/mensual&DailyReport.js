import SuiviDesVentes from "./suivi_Des_Ventes/suiviDesVentes"
import { useSelector } from "react-redux";
import MensFilter from "../filter/filterMensRap";
import MensRapSuiviDepense from "./suivi_depense/suiviDepenseMens";
import DailyFilter from "../filter/filterDailyRap";
import useDateParams from "../reuseFunction/dateParams";
export function MensRepport ({user}) {


    //params
    const {setterDateParams} = useDateParams();

    //date in fields 
    // ********the date is selectionned cause it controller is a reducer********88
    const date = useSelector (state => state.mensRapport.date);

    //a fucntion we're gonna pass to the date controller filds cause 
    //it's using a dispatch method 
    function setFilterParams() {

        setterDateParams(date);
    };

    return (
        <div>
            {user === 'rappMens' ? <MensFilter prev = {date} onclick = {setFilterParams}/> : <DailyFilter prev = {date} onclick = {setFilterParams} component = 'daily'/>}
            <SuiviDesVentes  user = {user}/>
            <MensRapSuiviDepense user = {user}/>
        </div>
    );
}