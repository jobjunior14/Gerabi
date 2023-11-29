import { useEffect, useState } from "react";
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

    // const props.componentName = useSelector (state => state.mensRapport.props.componentName);
    const [depenseEff, setDepenseEff] = useState(0);

    //dataDego Vente
    const [venteDego, setVenteDego] = useState(null);
    
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

                const bralimaData = await axios.get(`http://localhost:5001/api/v1/${props.componentName}/bralima/rapportMensuel/Allstast/${year}/${month}`);
                const brasimbaData = await axios.get(`http://localhost:5001/api/v1/${props.componentName}/brasimba/rapportMensuel/Allstast/${year}/${month}`);
                const liqueursData = await axios.get(`http://localhost:5001/api/v1/${props.componentName}/liqueurs/rapportMensuel/Allstast/${year}/${month}`);
                const autreProduitData = await axios.get(`http://localhost:5001/api/v1/${props.componentName}/autreProduit/rapportMensuel/Allstast/${year}/${month}`);
                //depense Effectuees
                const depenseEffMens = await axios.get(`http://localhost:5001/api/v1/${props.componentName}/depenseEff/${year}/${month}`);
                //vente system
                const dataVente = await axios.get(`http://localhost:5001/api/v1/${props.componentName}/vente/${year}/${month}`);
                //set vente system
                if (dataVente.data.stats.stats.length > 0){
                    setVenteDego(dataVente.data.stats.stats[0].venteDego);
                };
                //set depense eff
                if (depenseEffMens.data.stats.stats.length > 0){
                     setDepenseEff(prev => depenseEffMens.data.stats.stats[0].venteDego);
                }
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

    }, [year, month, props.componentName]);
    
    if (year > currentYear || month > currentMonth) {
        
        return (<div>
            <h1>Ooouups vous ne pouvez demander une donnee d'une date inexistante</h1>
        </div>
        )
    } else {

        return (<div>
            <h2>Suivi Des Ventes</h2>
            <VenteBar venteDego = {venteDego} />
            <Approvisionnement />
            <Benefice depenseEff = {depenseEff} />
        </div>)
    }
}