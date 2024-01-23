/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "../../../axiosUrl"
import { useDispatch } from "react-redux";
import { mensRapportActions } from "../../store/mensRepport-slice";
import Approvisionnement from "./approvisionnement";
import Benefice from "./benefice";
import VenteBar from "./venteBar";
import useParamsGetter from "../../reuseFunction/paramsGetter";
import useDateParams from "../../reuseFunction/dateParams";
import useTokenError from '../../errorPages/tokenError'
export default function SuiviDesVentes ({user}) {

    const dispatch = useDispatch();
    //stateAction is here to know wich component is using the data based to current usrl using the Params data
    const {componentName} = useParamsGetter();

    //dependacies of useEffect
    const {year, month, day, no_existent} = useDateParams();

    //state to stoking the depense effectuee 
    const [depenseEff, setDepenseEff] = useState(0);

    //dataDego Vente
    const [venteDego, setVenteDego] = useState(null);

    //set the booelen value based on the current use of the component
    const currentUser = user === 'rappMens' ? true : false;
    //error loading state and the loading state will
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    

    const headers = {
        headers: {
            "content-type": "application/json", 'withCredentials': true,
            'authorization': `Bearer ${localStorage.getItem('jwtA')}`
        }
    };
    //******************************fecth the data*************************************/
    useEffect (() => {

        //initialize the data to set the loading state
        dispatch(mensRapportActions.setSuiviVente({
            bralima: null,
            brasimba: null,
            liqueurs: null,
            autreProduit: null
        }));
        const fecthData = async () => {
            
            try {
                //initialize the error state to false
                setError(false);
                setLoading(true);
                //based on the **currentUser*** variable we get different Data 
                const bralimaData = currentUser ? await axios.get(`/${componentName}/bralima/rapportMensuel/Allstast/${year}/${month}`, headers) :
                    await axios.get(`/${componentName}/bralima/rapportJournalier/dailyRap/${year}/${month}/${day}`, headers);

                const brasimbaData = user === "rappMens" ? await axios.get(`/${componentName}/brasimba/rapportMensuel/Allstast/${year}/${month}`, headers) :
                    await axios.get(`/${componentName}/brasimba/rapportJournalier/dailyRap/${year}/${month}/${day}`, headers);

                const liqueursData = currentUser ? await axios.get(`/${componentName}/liqueurs/rapportMensuel/Allstast/${year}/${month}`, headers) :
                    await axios.get(`/${componentName}/liqueurs/rapportJournalier/dailyRap/${year}/${month}/${day}`, headers);

                const autreProduitData = currentUser ? await axios.get(`/${componentName}/autreProduit/rapportMensuel/Allstast/${year}/${month}`, headers) :
                    await axios.get(`/${componentName}/autreProduit/rapportJournalier/dailyRap/${year}/${month}/${day}`, headers);

                //depense Effectuees
                const depenseEffMens = currentUser ? await axios.get(`/${componentName}/depenseEff/${year}/${month}`, headers) :
                    await axios.get(`/${componentName}/depenseEff/${year}/${month}/${day}`, headers);
                //vente system
                const dataVente = currentUser ? await axios.get(`/${componentName}/vente/${year}/${month}`, headers) :
                    await axios.get(`/${componentName}/vente/${year}/${month}/${day}`, headers);

                //set vente system
                if (currentUser) {

                    if (dataVente.data.stats.stats.length > 0){
                        setVenteDego(dataVente.data.stats.stats[0].venteDego);
                    }
                    //set depense eff
                    if (depenseEffMens.data.stats.stats.length > 0){
                        setDepenseEff(depenseEffMens.data.stats.stats[0].venteDego);
                    }
                } else {

                    //set vente system
                    if (dataVente.data.data.day) {
                        setVenteDego(dataVente.data.data.day.valeur);
                    }
                    //set depense eff
                    if (depenseEffMens.data.data.day) {
                        setDepenseEff(depenseEffMens.data.data.day.valeur);
                    }
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
              setLoading(false);
              setError(err);
            } finally {
                setLoading(false);
            }
        }; fecthData();

        
        
    }, [year, month, componentName, day, currentUser]);
    /****************redirect to the login page if login error************* */
                useTokenError(error);
    /////////////////////*************/////////////////// */
    if (no_existent) {
        return (<div className="my-20 text-2xl">
            <h1 className="dark:text-gray-50">Ooouups vous ne pouvez demander une donnee d&apos;une date inexistante</h1>
        </div>)
    } else {

        return (<div className="justify-center flex ">
            <h2 className="lg:text-3xl text-2xl font-bold text-gray-800 mb-5 absolute dark:text-gray-50">Suivi Des Ventes</h2>
            <div className="bg-slate-200 rounded-lg my-12 w-full ">
                <VenteBar loading={loading} error={error} venteDego = {venteDego} />
                <Approvisionnement loading={loading} error={error} />
                <Benefice loading={loading} error={error} depenseEff = {depenseEff} />
            </div>
        </div>)
    }
}