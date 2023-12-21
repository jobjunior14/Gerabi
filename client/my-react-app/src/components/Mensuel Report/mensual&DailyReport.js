import SuiviDesVentes from "./suivi_Des_Ventes/suiviDesVentes"
import { useDispatch, useSelector } from "react-redux";
import { mensRapportActions } from "../store/mensRepport-slice";
import { useSearchParams } from "react-router-dom";
import MensFilter from "../filter/filterMensRap";
import MensRapSuiviDepense from "./suivi_depense/suiviDepenseMens";
import DailyFilter from "../filter/filterDailyRap";
import useDateParams from "../reuseFunction/dateParams";
export function MensRepport ({user}) {

    const dispatch = useDispatch();

    //dispatch the userName
    dispatch(mensRapportActions.setUser(user));
    //params
    const {year, month, day, setterDateParams} = useDateParams();

    //date in fields
    const date = useSelector (state => state.mensRapport.date);


    //dispatch the params date through all the components
    dispatch(mensRapportActions.setParamsDate({year: year, month: month, day: day}));

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