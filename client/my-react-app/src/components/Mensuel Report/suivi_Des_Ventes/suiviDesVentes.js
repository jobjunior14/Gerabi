import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { mensRapportActions } from "../../store/mensRepport-slice";
import Approvisionnement from "./approvisionnement";
import Benefice from "./benefice";
import VenteBar from "./venteBar";

export default function SuiviDesVentes (props) {

    const dispatch = useDispatch();
    
    //dependacies of useEffect
    const year = useSelector(state => state.mensRapport.paramsDate.year);
    const month = useSelector (state => state.mensRapport.paramsDate.month);

    //current date
    const currentYear = Number (new Date().getFullYear());
    const currentMonth = Number (new Date().getMonth() + 1);

    const componentName = useSelector (state => state.mensRapport.componentName);
    
    //fecth the data
    useEffect (() => {

        dispatch(mensRapportActions.setSuiviVente({
            bralima: null,
            brasimba: null,
            liqueurs: null,
            autreProduit: null
        }));

        const fecthData = async () => {

            try {

                const bralimaData = await axios.get(`http://localhost:5001/api/v1/${componentName}/bralima/rapportMensuel/Allstast/${year}/${month}`);
                const brasimbaData = await axios.get(`http://localhost:5001/api/v1/${componentName}/brasimba/rapportMensuel/Allstast/${year}/${month}`);
                const liqueursData = await axios.get(`http://localhost:5001/api/v1/${componentName}/liqueurs/rapportMensuel/Allstast/${year}/${month}`);
                const autreProduitData = await axios.get(`http://localhost:5001/api/v1/${componentName}/autreProduit/rapportMensuel/Allstast/${year}/${month}`);
                
                dispatch(mensRapportActions.setSuiviVente({
                    bralima: bralimaData.data.stats.stats,
                    brasimba: brasimbaData.data.stats.stats,
                    liqueurs: liqueursData.data.stats.stats,
                    autreProduit: autreProduitData.data.stats.stats
                }));

            } catch (err) {
                if (err.message){

                    console.log (err.data);
                } else {

                    console.log (err);
                };
            };
        }; fecthData();

    }, [year, month, componentName]);
    
    if (year > currentYear || month > currentMonth) {
        
        return (<div>
            <h1>Ooouups vous ne pouvez demander une donnee d'une date inexistante</h1>
        </div>
        )
    } else {

        return (<div>
            <h2>Suivi Des Ventes</h2>
            <VenteBar />
            <Approvisionnement />
            <Benefice />
        </div>)
    }
}