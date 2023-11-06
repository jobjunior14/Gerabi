import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { suiviDepenseActions } from "../../store/suiviDepense-slice";
import { useSearchParams } from "react-router-dom";
import SoriteCaisse from "./sortieCaisse";
import EntreeCaisse from "./entreeCaisse";
import DailyFilter from "../../filter/filterDailyRap";
import { current } from "@reduxjs/toolkit";

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

                if (year < currentDay || month < currentMonth || day < current) {

                    
                }

                const suiviVenteData = await axios.get (`http://localhost:5001/api/v1/suiviDepense/rapportJournalier/${year}/${month}/${day}`);

                //find the largest table row 
                if (suiviVenteData.data.data.sortieCaisse && suiviVenteData.data.data.sortieCaisse.length > 0) {

                    let saveTalbeRow = 0;

                    for (let i = 0; i < suiviVenteData.data.data.sortieCaisse.length; i++) {
                        
                        
                        const dataLenght = suiviVenteData.data.data.sortieCaisse[i].data.length;
                        
                        if (saveTalbeRow < dataLenght) {
                            
                            saveTalbeRow = dataLenght;

                        };
                    };

                    dispacth(suiviDepenseActions.setSortieCaisse(suiviVenteData.data.data.sortieCaisse.map(
                        (el, index) => {
                            
                            const data = el.data.map((el, index) => {return {...el, index: index}});
    
                            return {...el, index: index, data: data};
                        }
                    )));
                    
                    //dispatch the greatest length
                    dispacth(suiviDepenseActions.setSameLength(saveTalbeRow));
                };
                
                //dispatch and set idindex
                dispacth(suiviDepenseActions.setEntreeCaisse(suiviVenteData.data.data.entreeCaisse.map((el, index) => {return {...el, index: index}})));
                
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
                <DailyFilter component = {'suiviDepense'} prev = {date} onclick = {setFilterParams} />
                <h1> Ooouups vous ne pouvez demander une donnee d'une date inexistante </h1>
            </div>
        );
    } else {

        return (
            <div>
                <DailyFilter component = {'suiviDepense'} prev = {date} onclick = {setFilterParams} />
                <EntreeCaisse/>
                <SoriteCaisse /> 
            </div>
        )
    }
    
}