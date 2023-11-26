import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { suiviDepenseActions } from "../../../store/suiviDepense-slice";
import { useSearchParams } from "react-router-dom";
import SoriteCaisse from "./sortieCaisse";
import EntreeCaisse from "./entreeCaisse";
import DailyFilter from "../../../filter/filterDailyRap";
import SoldCaisse from "./soldCaisse";
import formatDate from "../../../reuseFunction/suiviStockVente/rightFormatDate";

function postAndUpdate (entreeCaisse, sortieCaisse, year, month, day, dispacth, update,  totalSortieCaisse, totalSoldCaisse, totalDette, props, depenseEff) {


    // set Sold caisse
    // dispacth(suiviDepenseActions.setSoldCaisse());

    const newSortieCaisseData = [];
    let suiviDepenseData = null;
    let createdAt = formatDate (year, month, day);
    
    //delete empty name of sortie caisse
    for (let i of sortieCaisse){
        if (i.name !== "") {

            const fonctiondata = [];
            for (let y of i.data) {

                if (y.libel !== "" && y.amount !== "") {

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
    //delete empty name of entree caisse
    const newEntreeCaisseData = [];
    for (let i of entreeCaisse) {

        if (i.name !== "") {
            newEntreeCaisseData.push({name: i.name, data: {amount: i.data.amount, createdAt: createdAt}} );
        };
    };

    suiviDepenseData = {
        data:{
            data: {
                entreeCaisse: newEntreeCaisseData,
                sortieCaisse: newSortieCaisseData,
                soldCaisse: {
                    amount: Number (totalSoldCaisse) - Number (totalSortieCaisse) - Number(totalDette),
                    createdAt: createdAt
                }
            }
        }
    };
    const fecthData = async () => {

        try {
                dispacth(suiviDepenseActions.setEntreeCaisse(null));
                dispacth(suiviDepenseActions.setSortieCaisse(null));
                const responseSuiviDepense = !update ?  await axios.post(`http://localhost:5001/api/v1/${props.componentName}/suiviDepense/rapportJournalier?year=${year}&month=${month}&day=${day}`, suiviDepenseData) : await axios.post(`http://localhost:5001/api/v1/${props.componentName}/suiviDepense/rapportJournalier/${year}/${month}/${day}`, suiviDepenseData);
                const responseDepenseEff = update ? await axios.post( `http://localhost:5001/api/v1/${props.componentName}/depenseEff/${year}/${month}/${day}`, {valeur: depenseEff, createdAt: createdAt} ) : await axios.post( `http://localhost:5001/api/v1/${props.componentName}/depenseEff?year=${year}&month=${month}&day=${day}`, {valeur: depenseEff, createdAt: createdAt});


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

                //set  sold caisse
                dispacth(suiviDepenseActions.setSoldCaisse(responseSuiviDepense.data.data.soldCaisse.amount));

                dispacth(suiviDepenseActions.setUpdate(true));
                dispacth(suiviDepenseActions.setReadOnly(true));

                //set the depense effectuee
                dispacth(suiviDepenseActions.setDepenseEff(responseDepenseEff.data.data.day.valeur));
            } catch (error) {
                console.log (error);
            };
    };fecthData();
};


export default function SuiviDepense (props){

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
    const totalDailyDebt= useSelector (state => state.suiviDepense.totalDette);

    //data for sold caisse
    const totalSortieCaisse = useSelector (state => state.suiviDepense.totalSortieCaisse);
    const totalSoldCaisse = useSelector(state => state.suiviDepense.totalSoldCaisse);
    const totalDette = useSelector (state => state.suiviDepense.totalDette);

    //depense effectuee
    const depenseEff = useSelector (state => state.suiviDepense.depenseEff);

    useEffect (() => {

        const fecthData = async () => {

            try {
                //initial State
                dispacth(suiviDepenseActions.setEntreeCaisse(null));
                dispacth(suiviDepenseActions.setSortieCaisse(null));
                dispacth(suiviDepenseActions.setSoldCaisse(0));
                dispacth (suiviDepenseActions.setTotalSoldCaisse(0));
                dispacth(suiviDepenseActions.setPrevSoldCaisse(0));
                dispacth(suiviDepenseActions.setTotalDette(0));
                dispacth(suiviDepenseActions.setTotalSortieCaisse(0));
                dispacth(suiviDepenseActions.setDepenseEff(0));
                //fecth the data
                const suiviDepenseData = await axios.get (`http://localhost:5001/api/v1/${props.componentName}/suiviDepense/rapportJournalier/${year}/${month}/${day}`);
                const totDette = await axios.get (`http://localhost:5001/api/v1/${props.componentName}/suiviDette/rapportJournalier/totDette/${year}/${month}/${day}`);
                const depenseEffData = await axios.get (`http://localhost:5001/api/v1/${props.componentName}/depenseEff/${year}/${month}/${day}`);
                
                //set the total debt
                dispacth(suiviDepenseActions.setTotalDette(totDette.data.data));
                //set the depense effectuee
                if (depenseEffData.data.data.day) {

                    dispacth(suiviDepenseActions.setDepenseEff(depenseEffData.data.data.day.valeur));
                };

                if (suiviDepenseData.data.data.sortieCaisse.length > 0 && suiviDepenseData.data.data.entreeCaisse.length > 0  && suiviDepenseData.data.data.soldCaisse) {
                    //set some states
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
    
                    //set  sold caisse
                    if (suiviDepenseData.data.data.soldCaisse) {
                        dispacth(suiviDepenseActions.setSoldCaisse(suiviDepenseData.data.data.soldCaisse.amount));
                    } else {
                        dispacth(suiviDepenseActions.setSoldCaisse(0));
                    };

                } else {

                    dispacth(suiviDepenseActions.setReadOnly(false));
                    dispacth(suiviDepenseActions.setUpdate(false));

                    const lastCreatedData = await axios.get(`http://localhost:5001/api/v1/${props.componentName}/suiviDepense/lastElement/${year}/${month}`);

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
                    } else {

                        dispacth(suiviDepenseActions.setReadOnly(false));
                        dispacth(suiviDepenseActions.setUpdate(false));
                        dispacth(suiviDepenseActions.setEntreeCaisse([]));
                        dispacth(suiviDepenseActions.setSortieCaisse([]));

                    }
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

    // set the previous sold caisse
    dispacth(suiviDepenseActions.setPrevSoldCaisse(soldCaisse - (totalDette + totalSortieCaisse)));

    function setFilterParams() {

        setDateParams(prev => prev = date);
    };

    useEffect (() => {

        setDateParams (prev => prev = date);
    }, [year, month, day]);

    function postData(){
        //post data or create it 
        postAndUpdate(entreeCaisse, sortieCaisse, year, month, day, dispacth, false, totalSortieCaisse,totalSoldCaisse, totalDette, props, depenseEff);
    };
    
    function updateData() {
        postAndUpdate(entreeCaisse, sortieCaisse, year, month, day, dispacth, true, totalSortieCaisse,totalSoldCaisse, totalDette, props, depenseEff);
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
                
                <label name = 'depenseEffectuee' >Depense Effectuées</label>
                <input value= {depenseEff} type="number" name = 'depenseEffectuee' onChange={ e => dispacth(suiviDepenseActions.setDepenseEff(Number (e.target.value)))} placeholder="Depense effectuée"/>
                <p>{depenseEff}</p>
                <EntreeCaisse componentName = {props.componentName}/>
                <SoriteCaisse /> 
                <SoldCaisse/>
                <p> Total Dette du {day}-{month}-{year}: <b> {totalDailyDebt}</b></p>
                {!update ? <button onClick={postData}> Enregistrer les données</button> : <button onClick={updateData}> Mettre à les données</button> }
            </div>
        )
    };
}