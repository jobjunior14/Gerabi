import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { mensRapportActions } from "../../store/mensRepport-slice";
import Approvisionnement from "./approvisionnement";
import Benefice from "./benefice";
import VenteBar from "./venteBar";
import MensFilter from "../../filter/filterMensRap";

export default function SuiviDesVentes (props) {

    const dispatch = useDispatch();

    //params
    const [dateParams, setDateParams] = useSearchParams();

    //date in fields
    const date = useSelector (state => state.mensRapport.date);
    
    //dependacies of useEffect
    const year = Number(dateParams.get("year"));
    const month = Number(dateParams.get("month")); 

    //current date
    const currentYear = Number (new Date().getFullYear());
    const currentMonth = Number (new Date().getMonth() + 1);

    const componentName = useSelector (state => state.mensRapport.componentName);
    
    //fecth the data
    useEffect (() => {

        dispatch(mensRapportActions.setMensualData({
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
                
                console.log (bralimaData.data.stats.stats)
                dispatch(mensRapportActions.setMensualData({
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

    function setFilterParams() {

        setDateParams(prev => prev = date);
    };
    
    if (year > currentYear || month > currentMonth) {
        
        return (<div>
            <MensFilter prev = {date} onclick = {setFilterParams}/>
            <h1>Ooouups vous ne pouvez demander une donnee d'une date inexistante</h1>
        </div>
        )
    } else {

        return (<div>
            <MensFilter prev = {date} onclick = {setFilterParams}/>
            <VenteBar />
            <Approvisionnement />
            <Benefice />
        </div>)
    }
}