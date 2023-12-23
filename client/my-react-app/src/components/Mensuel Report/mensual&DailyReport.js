import SuiviDesVentes from "./suivi_Des_Ventes/suiviDesVentes"
import { useDispatch, useSelector } from "react-redux";
import { mensRapportActions } from "../store/mensRepport-slice";
import MensFilter from "../filter/filterMensRap";
import MensRapSuiviDepense from "./suivi_depense/suiviDepenseMens";
import DailyFilter from "../filter/filterDailyRap";
import useDateParams from "../reuseFunction/dateParams";
export function MensRepport ({user}) {

    //params
    const { setterDateParams} = useDateParams();

    //date in fields
    const date = useSelector (state => state.mensRapport.date);

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