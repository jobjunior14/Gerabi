import SuiviDesVentes from "./suivi_Des_Ventes/suiviDesVentes"
import { useDispatch } from "react-redux";
import { mensRapportActions } from "../store/mensRepport-slice";

export function MensRepport (props) {
    const dispatch = useDispatch();
    //dispatch the component Name 
    dispatch(mensRapportActions.setComponentName(props.componentName));

    return (
        <div>
            <SuiviDesVentes/>
        </div>
    )
}