import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import EntreeCaisse from "./entreeCaisse";
import { suiviDepenseActions } from "../../store/suiviDepense-slice";
import { useSearchParams } from "react-router-dom";
import DailyFilter from "../../filter/filterDailyRap";
import AddProduct from "./addProduct";

export default function SuiviDepense (){

    const dispacth = useDispatch();

    //params
    const [dateParams, setDateParams] = useSearchParams();

    //date in fields
    const date = useSelector (state => state.suiviDepense.date);

    //dependacies of useEffect
    const year = Number(dateParams.get("year"));
    const month = Number(dateParams.get("month")); 
    const day = Number(dateParams.get("day"));

    //current date
    const currentYear = Number (new Date().getFullYear());
    const currentMonth = Number (new Date().getMonth() + 1);
    const currentDay = Number (new Date().getDate());

    useEffect (() => {

        dispacth(suiviDepenseActions.setEntreeCaisse(null));

        const fecthData = async () => {

            try {

                const suiviVenteData = await axios.get (`http://localhost:5001/api/v1/suiviDepense/rapportJournalier/${year}/${month}/${day}`);

                console.log (suiviVenteData.data.data);
                dispacth(suiviDepenseActions.setEntreeCaisse(suiviVenteData.data.data.entreeCaisse.map((el, index) => {return {...el, id: index}})));
            } catch (err) {
                if (err.message) {

                    console.log (err.data);
                } else {
                    console.log (err);
                }
            };
        }; fecthData();

    }, [year, month, day]);

    function setFilterParams() {

        setDateParams(prev => prev = date);
    };

    if (year > currentYear || month > currentMonth || day > currentDay) {

        return (
            <div>
                <DailyFilter prev = {date} onclick = {setFilterParams} />
                <h1> Ooouups vous ne pouvez demander une donnee d'une date inexistante </h1>
            </div>
        );
    } else {

        return (
            <div>
                <DailyFilter prev = {date} onclick = {setFilterParams} />
                <EntreeCaisse/>
                <AddProduct/>
            </div>
        )
    }
    
}