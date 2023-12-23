import { useEffect, useState } from "react";
import axios from "../../../axiosUrl"
import { useDispatch } from "react-redux";
import { mensRapportActions } from "../../store/mensRepport-slice";
import Approvisionnement from "./approvisionnement";
import Benefice from "./benefice";
import VenteBar from "./venteBar";
import useParamsGetter from "../../reuseFunction/paramsGetter";
import useDateParams from "../../reuseFunction/dateParams";
export default function SuiviDesVentes ({user}) {

    const dispatch = useDispatch();
    //stateAction is here to know wich component is using the data based to current usrl using the Params data
    const {componentName} = useParamsGetter();

    
    //dependacies of useEffect
    const {year, month, day, currentDay, currentMonth, currentYear} = useDateParams();

    //state to stoking the depense effectuee 
    const [depenseEff, setDepenseEff] = useState(0);

    //dataDego Vente
    const [venteDego, setVenteDego] = useState(null);

    //set the booelen value based on the current use of the component
    const currentUser = user === 'rappMens' ? true : false;
    
    //******************************fecth the data*************************************/
    useEffect (() => {

        dispatch(mensRapportActions.setSuiviVente({
            bralima: null,
            brasimba: null,
            liqueurs: null,
            autreProduit: null
        }));

        const fecthData = async () => {

            try {
                //based on the **currentUser*** variable we get different Data 
                const bralimaData = currentUser ? await axios.get(`/${componentName}/bralima/rapportMensuel/Allstast/${year}/${month}`) :
                    await axios.get(`/${componentName}/bralima/rapportJournalier/dailyRap/${year}/${month}/${day}`);

                const brasimbaData = user === "rappMens" ? await axios.get(`/${componentName}/brasimba/rapportMensuel/Allstast/${year}/${month}`) :
                    await axios.get(`/${componentName}/brasimba/rapportJournalier/dailyRap/${year}/${month}/${day}`);

                const liqueursData = currentUser ? await axios.get(`/${componentName}/liqueurs/rapportMensuel/Allstast/${year}/${month}`) :
                    await axios.get(`/${componentName}/liqueurs/rapportJournalier/dailyRap/${year}/${month}/${day}`);

                const autreProduitData = currentUser ? await axios.get(`/${componentName}/autreProduit/rapportMensuel/Allstast/${year}/${month}`) :
                    await axios.get(`/${componentName}/autreProduit/rapportJournalier/dailyRap/${year}/${month}/${day}`);

                //depense Effectuees
                const depenseEffMens = currentUser ? await axios.get(`/${componentName}/depenseEff/${year}/${month}`) :
                    await axios.get(`/${componentName}/depenseEff/${year}/${month}/${day}`);
                //vente system
                const dataVente = currentUser ? await axios.get(`/${componentName}/vente/${year}/${month}`) :
                    await axios.get(`/${componentName}/vente/${year}/${month}/${day}`);

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

                    console.log (err);
                } else {
                    console.log (err);

                };
            };
        }; fecthData();

    }, [year, month, componentName, day, currentUser]);
    
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