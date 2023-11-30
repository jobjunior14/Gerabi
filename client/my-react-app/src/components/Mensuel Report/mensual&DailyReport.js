import SuiviDesVentes from "./suivi_Des_Ventes/suiviDesVentes"
import { useDispatch, useSelector } from "react-redux";
import { mensRapportActions } from "../store/mensRepport-slice";
import { useSearchParams } from "react-router-dom";
import MensFilter from "../filter/filterMensRap";
import MensRapSuiviDepense from "./suivi_depense/suiviDepenseMens";

export function MensRepport (props) {
    const dispatch = useDispatch();
    //params
    const [dateParams, setDateParams] = useSearchParams();

    //date in fields
    const date = useSelector (state => state.mensRapport.date);

    //dependacies of useEffect
    const year = Number(dateParams.get("year"));
    const month = Number(dateParams.get("month"));
    const day = Number(dateParams.get("day"));

    //dispatch the params date through all the components
    dispatch(mensRapportActions.setParamsDate({year: year, month: month}));

    function setFilterParams() {

        setDateParams(prev => prev = date);
    };

    return (
        <div>
             <MensFilter prev = {date} onclick = {setFilterParams}/>
            <SuiviDesVentes componentName = {props.componentName}/>
            <MensRapSuiviDepense componentName = {props.componentName}/>
        </div>
    );
}