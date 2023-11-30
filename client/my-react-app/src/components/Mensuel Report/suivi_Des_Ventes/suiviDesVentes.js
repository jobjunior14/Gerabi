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
    const day = useSelector (state => state.mensRapport.paramsDate.day);
    //select the props.user
    // const props.user = useSelector(state => state.mensRapport.props.user);

    //current date
    const currentYear = Number (new Date().getFullYear());
    const currentMonth = Number (new Date().getMonth() + 1);
    const currentDay = Number (new Date().getDay);
    // const props.componentName = useSelector (state => state.mensRapport.props.componentName);
    const [depenseEff, setDepenseEff] = useState(0);

    //dataDego Vente
    const [venteDego, setVenteDego] = useState(null);

    //current user
    const currentUser = props.user === 'rappMens' ? true : false;
    
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

                const bralimaData = currentUser ? await axios.get(`http://localhost:5001/api/v1/${props.componentName}/bralima/rapportMensuel/Allstast/${year}/${month}`) :
                    await axios.get(`http://localhost:5001/api/v1/${props.componentName}/bralima/rapportJournalier/dailyRap/${year}/${month}/${day}`);

                const brasimbaData = props.user === "rappMens" ? await axios.get(`http://localhost:5001/api/v1/${props.componentName}/brasimba/rapportMensuel/Allstast/${year}/${month}`) :
                    await axios.get(`http://localhost:5001/api/v1/${props.componentName}/brasimba/rapportJournalier/dailyRap/${year}/${month}/${day}`);

                const liqueursData = currentUser ? await axios.get(`http://localhost:5001/api/v1/${props.componentName}/liqueurs/rapportMensuel/Allstast/${year}/${month}`) :
                    await axios.get(`http://localhost:5001/api/v1/${props.componentName}/liqueurs/rapportJournalier/dailyRap/${year}/${month}/${day}`);

                const autreProduitData = currentUser ? await axios.get(`http://localhost:5001/api/v1/${props.componentName}/autreProduit/rapportMensuel/Allstast/${year}/${month}`) :
                    await axios.get(`http://localhost:5001/api/v1/${props.componentName}/autreProduit/rapportJournalier/dailyRap/${year}/${month}/${day}`);

                //depense Effectuees
                const depenseEffMens = currentUser ? await axios.get(`http://localhost:5001/api/v1/${props.componentName}/depenseEff/${year}/${month}`) :
                    await axios.get(`http://localhost:5001/api/v1/${props.componentName}/depenseEff/${year}/${month}/${day}`);
                //vente system
                const dataVente = currentUser ? await axios.get(`http://localhost:5001/api/v1/${props.componentName}/vente/${year}/${month}`) :
                    await axios.get(`http://localhost:5001/api/v1/${props.componentName}/vente/${year}/${month}/${day}`);

                //set vente system
                if (currentUser) {

                    if (dataVente.data.stats.stats.length > 0){
                        setVenteDego(dataVente.data.stats.stats[0].venteDego);
                    };
                    //set depense eff
                    if (depenseEffMens.data.stats.stats.length > 0){
                        setDepenseEff(prev => depenseEffMens.data.stats.stats[0].venteDego);
                    };
                } else {

                    //set vente system
                    if (dataVente.data.data.day) {
                        setVenteDego(dataVente.data.data.day.valeur);
                    };
                    //set depense eff
                    if (depenseEffMens.data.data.day) {
                        setDepenseEff(prev => depenseEffMens.data.data.day.valeur);
                    };
                }
                
                currentUser ? dispatch(mensRapportActions.setSuiviVente({
                    bralima: bralimaData.data.stats.stats,
                    brasimba: brasimbaData.data.stats.stats,
                    liqueurs: liqueursData.data.stats.stats,
                    autreProduit: autreProduitData.data.stats.stats
                })) : dispatch(mensRapportActions.setSuiviVente({
                    bralima: [bralimaData.data.data],
                    brasimba: [brasimbaData.data.data],
                    liqueurs: [liqueursData.data.data],
                    autreProduit: [autreProduitData.data.data]
                }));
               
            } catch (err) {
                if (err.message){

                    console.log (err.data);
                } else {

                    console.log (err);
                };
            };
        }; fecthData();

    }, [year, month, props.componentName, day, currentUser]);
    
    if (year > currentYear || month > currentMonth || day > currentDay) {
        
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