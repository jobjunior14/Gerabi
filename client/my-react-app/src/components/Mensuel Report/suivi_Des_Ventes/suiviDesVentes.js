import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { venteBarActions } from "../../store/venteBar-slice";
import Approvisionnement from "./approvisionnement";
import Benefice from "./benefice";
import VenteBar from './venteBar';
import MensFilter from "../../filter/filterMensRap";

export default function SuiviDesVentes () {

    const dispatch = useDispatch();

    //params
    const [dateParams, setDateParams] = useSearchParams();

    //date in fields
    const date = useSelector (state => state.venteBar.date);
    
    //dependacies of useEffect
    const year = Number(dateParams.get("year"));
    const month = Number(dateParams.get("month")); 

    //current date
    const currentYear = Number (new Date().getFullYear());
    const currentMonth = Number (new Date().getMonth() + 1);
    
    //fecth the data
    useEffect (() => {

        dispatch(venteBarActions.setMensualData({
            bralima: null,
            brasimba: null,
            liqueurs: null,
            autreProduit: null
        }));

        const fecthData = async () => {

            try {

                const bralimaData = await axios.get(`http://localhost:5001/api/v1/bralima/raportMensuel/Allstast/${year}/${month}`);
                const brasimbaData = await axios.get(`http://localhost:5001/api/v1/brasimba/raportMensuel/Allstast/${year}/${month}`);
                const liqueursData = await axios.get(`http://localhost:5001/api/v1/liqueurs/raportMensuel/Allstast/${year}/${month}`);
                const autreProduitData = await axios.get(`http://localhost:5001/api/v1/autreProduit/raportMensuel/Allstast/${year}/${month}`);
            
                dispatch(venteBarActions.setMensualData({
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

    }, [year, month]);

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