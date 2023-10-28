import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { venteBarActions } from "../../store/venteBar-slice";
import DailyFilter from "../../filter/filterDailyRap";
import Approvisionnement from "./approvisionnement";
import Benefice from "./benefice";
import VenteBar from './venteBar'

export default function SuiviDesVentes () {

    const dispatch = useDispatch();

    //params
    const [dateParams, setDateParams] = useSearchParams();

    //date in fields
    const date = useSelector (state => state.venteBar.date);

    //dependacies of useEffect
    const year = Number(dateParams.get("year"));
    const month = Number(dateParams.get("month")); 

    const data = useSelector (state => state.venteBar.mensualData)

    //fecth the data
    useEffect (() => {

        dispatch(venteBarActions.setMensualData(null));

        const fecthData = async () => {

            try {

                const bralimaData = await axios.get(`http://localhost:5001/api/v1/bralima/raportMensuel/Allstast/${date.year}/${date.month}`);
                const brasimbaData = await axios.get(`http://localhost:5001/api/v1/brasimba/raportMensuel/Allstast/${date.year}/${date.month}`);
                const liqueursData = await axios.get(`http://localhost:5001/api/v1/liqueurs/raportMensuel/Allstast/${date.year}/${date.month}`);
                const autreProduitData = await axios.get(`http://localhost:5001/api/v1/autreProduit/raportMensuel/Allstast/${date.year}/${date.month}`);

                dispatch(venteBarActions.setMensualData({
                    bralima: bralimaData.data.stats.stats[0],
                    brasimba: brasimbaData.data.stats.stats[0],
                    liqueurs: liqueursData.data.stats.stats[0],
                    autreProduit: autreProduitData.data.stats.stats[0]
                }));

            } catch (err) {
                if (err.message){

                    console.log (err.data);
                } else {

                    console.log (err);
                };
            };
        }; fecthData();

        dispatch (venteBarActions.setDate({year: year, month: month}));        
    }, [date.year, date.month]);


    function setFilterParams() {

        setDateParams(prev => prev = date);

    };

    return (<div>
        <DailyFilter prev = {date} onclick = {setFilterParams} mens = {true} />
        <VenteBar />
        <Approvisionnement />
        <Benefice />
    </div>)
}