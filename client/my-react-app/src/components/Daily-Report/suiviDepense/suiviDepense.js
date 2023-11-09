import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { suiviDepenseActions } from "../../store/suiviDepense-slice";
import { useSearchParams } from "react-router-dom";
import SoriteCaisse from "./sortieCaisse";
import EntreeCaisse from "./entreeCaisse";
import DailyFilter from "../../filter/filterDailyRap";
import SoldCaisse from "./soldCaisse";

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
    //data 
    const soldCaisse = useSelector (state => state.suiviDepense.soldCaisse);
    const entreeCaisse = useSelector (state => state.suiviDepense.entreeCaisse);
    const sortieCaisse = useSelector (state => state.suiviDepense.sortieCaisse);
    const update = useSelector (state => state.suiviDepense.update);

    useEffect (() => {

        dispacth(suiviDepenseActions.setEntreeCaisse(null));
        dispacth(suiviDepenseActions.setSortieCaisse(null));
        
        const fecthData = async () => {

            try {

                const suiviDepenseData = await axios.get (`http://localhost:5001/api/v1/suiviDepense/rapportJournalier/${year}/${month}/${day}`);
                
                if (suiviDepenseData.data.data.sortieCaisse.length > 0 && suiviDepenseData.data.data.entreeCaisse.length > 0  && suiviDepenseData.data.data.soldCaisse) {

                    dispacth(suiviDepenseActions.setUpdate(true));
                    dispacth(suiviDepenseActions.setReadOnly(true));
                    //find the largest table row 
                    if (suiviDepenseData.data.data.sortieCaisse ) {
    
                        let saveTalbeRow = 0;
    
                        for (let i = 0; i < suiviDepenseData.data.data.sortieCaisse.length; i++) {
                            
                            
                            const dataLenght = suiviDepenseData.data.data.sortieCaisse[i].data.length;
                            
                            if (saveTalbeRow < dataLenght) {
                                
                                saveTalbeRow = dataLenght;
    
                            };
                        };
    
                        dispacth(suiviDepenseActions.setSortieCaisse(suiviDepenseData.data.data.sortieCaisse.map(
                            (el, index) => {
                                
                                const data = el.data.map((el, index) => {return {...el, index: index}});
        
                                return {...el, index: index, data: data};
                            }
                        )));
                        
                        // the greatest length
                        dispacth(suiviDepenseActions.setSameLength(saveTalbeRow));
                    };
                    
                    //set the index and entreeCaisse Data
                    dispacth(suiviDepenseActions.setEntreeCaisse(suiviDepenseData.data.data.entreeCaisse.map((el, index) => {return {...el, index: index}})));
    
                    //set  caisse
                    if (suiviDepenseData.data.data.soldCaisse) {
    
                        dispacth(suiviDepenseActions.setSoldCaisse(suiviDepenseData.data.data.soldCaisse.amount));
                    } else {
                        
                        dispacth(suiviDepenseActions.setSoldCaisse(0));
                    };
                } else {

                    dispacth(suiviDepenseActions.setReadOnly(false));
                    dispacth(suiviDepenseActions.setUpdate(false));

                    const lastCreatedData = await axios.get(`http://localhost:5001/api/v1/suiviDepense/lastElement/${year}/${month}`);

                    if (lastCreatedData.data.data) {
                        
                        //find the largest table row 
                        if (lastCreatedData.data.data.sortieCaisse ) {
        
                            let saveTalbeRow = 0;
        
                            for (let i = 0; i < lastCreatedData.data.data.sortieCaisse.length; i++) {
                                
                                
                                const dataLenght = lastCreatedData.data.data.sortieCaisse[i].data.length;
                                
                                if (saveTalbeRow < dataLenght) {
                                    
                                    saveTalbeRow = dataLenght;
        
                                };
                            };
        
                            dispacth(suiviDepenseActions.setSortieCaisse(lastCreatedData.data.data.sortieCaisse.map(
                                (el, index) => {
                                    const data = el.data.map((el, index) => {return {...el, index: index}});
            
                                    return {...el, index: index, data: data};
                                }
                            )));
                            
                            // the greatest length
                            dispacth(suiviDepenseActions.setSameLength(saveTalbeRow));
                        };
                        
                        //set the index and entreeCaisse Data
                        dispacth(suiviDepenseActions.setEntreeCaisse(lastCreatedData.data.data.entreeCaisse.map((el, index) => {return {...el, index: index}})));
        
                        //set  sold caisse
                        dispacth(suiviDepenseActions.setSoldCaisse(0)); 
                    };
                }
                
            } catch (err) {
                if (err.message) {

                    console.log (err);
                } else {
                    console.log (err);
                }
            };
        }; fecthData();

    }, [year, month, day]);

    function setFilterParams() {

        setDateParams(prev => prev = date);
    };

    useEffect (() => {

        setDateParams (prev => prev = date);
    }, [year, month, day]);

    function postData(){

        const newSortieCaisseData = [];
        let suiviDepenseData = null;
        let createdAt = `${year}-${month}-${day}T08:22:54.930Z`;

        //set the date to the right format
        if (month >= 10 && day >= 10) {
            createdAt = `${year}-${month}-${day}T08:22:54.930Z`;
        } else if (month >= 10 && day < 10) {
            createdAt = `${year}-${month}-0${day}T08:22:54.930Z`;
        } else if (month < 10 && day >= 10) {
            createdAt = `${year}-0${month}-${day}T08:22:54.930Z`;
        } else {
            createdAt = `${year}-0${month}-0${day}T08:22:54.930Z`;
        };

        for (let i of sortieCaisse){
            if (i.name !== "") {

                const fonctiondata = null;
                for (let y of i.data) {
    
                    if (y.libel !== "" || y.amount !== "") {
    
                        fonctiondata.push({
                            libel: y.libel,
                            amount: {
                                valeur: y.amount,
                                createdAt: createdAt
                            }
                        });
                    }
                };
                newSortieCaisseData.push({
                    name: i.name,
                    data: fonctiondata
                });
            };
        };

        suiviDepenseData = {
            data:{
                data: {
                    entreeCaisse: entreeCaisse.map(el => {return {...el, data: {...el.data, createdAt: createdAt}}}),
                    sortieCaisse: newSortieCaisseData,
                    soldCaisse: {
                        amount: soldCaisse,
                        createdAt: createdAt
                    }
                }
            }
        };
        const fecthData = async () => {

            try {
                    dispacth(suiviDepenseActions.setEntreeCaisse(null));
                    dispacth(suiviDepenseActions.setSortieCaisse(null));
                    const responseSuiviDepense = await axios.post(`http://localhost:5001/api/v1/suiviDepense/rapportJournalier?year=${year}&month=${month}&day=${day}`, suiviDepenseData);

                    //find the largest table row 
                    if (responseSuiviDepense.data.data.sortieCaisse ) {

                        let saveTalbeRow = 0;

                        for (let i = 0; i < responseSuiviDepense.data.data.sortieCaisse.length; i++) {
                            
                            
                            const dataLenght = responseSuiviDepense.data.data.sortieCaisse[i].data.length;
                            
                            if (saveTalbeRow < dataLenght) {
                                
                                saveTalbeRow = dataLenght;

                            };
                        };

                        dispacth(suiviDepenseActions.setSortieCaisse(responseSuiviDepense.data.data.sortieCaisse.map(
                            (el, index) => {
                                
                                const data = el.data.map((el, index) => {return {...el, index: index}});
        
                                return {...el, index: index, data: data};
                            }
                        )));
                        
                        // the greatest length
                        dispacth(suiviDepenseActions.setSameLength(saveTalbeRow));
                    };
                    
                    //set the index and entreeCaisse Data
                    dispacth(suiviDepenseActions.setEntreeCaisse(responseSuiviDepense.data.data.entreeCaisse.map((el, index) => {return {...el, index: index}})));

                    //set  caisse
                    dispacth(suiviDepenseActions.setSoldCaisse(responseSuiviDepense.data.data.soldCaisse));
                    
            } catch (error) {
                console.log (error);
            };
        };fecthData();
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
                <SoldCaisse/>
                <button onClick={postData}> Enregistrer les données</button>
            </div>
        )
    };
}