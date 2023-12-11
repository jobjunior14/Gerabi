import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { suiviDepenseActions } from "../../store/suiviDepense-slice";
import SoriteCaisse from "./sortieCaisse";
import EntreeCaisse from "./entreeCaisse";
import DailyFilter from "../../filter/filterDailyRap";
import SoldCaisse from "./soldCaisse";
import UniqueInput from "../../reuseFunction/uniqueInput";
import useDateParams from "../../reuseFunction/dateParams";
import usePostAndUpdate from "./utils/postAndData";
import useDataFetcherSuiviDepense from "./utils/dataFetcher";


export default function SuiviDepense ({componentName}){

    const dispatch = useDispatch();

    //date in fields
    const date = useSelector (state => state.suiviDepense.date);

    //date params
    const {year, month, day, currentDay, currentMonth, currentYear, setterDateParams} = useDateParams()  
    //data 
    const entreeCaisse = useSelector (state => state.suiviDepense.entreeCaisse);
    const sortieCaisse = useSelector (state => state.suiviDepense.sortieCaisse);
    const update = useSelector (state => state.suiviDepense.update);

    //data for sold caisse
    const totalSortieCaisse = useSelector (state => state.suiviDepense.totalSortieCaisse);
    const totalSoldCaisse = useSelector(state => state.suiviDepense.totalSoldCaisse);
    const totalDailyDebt = useSelector (state => state.suiviDepense.totalDette);
    const yourTotalDette = useSelector (state => state.suiviDepense.yourTotalDette);

    //depense effectuee
    const [depenseEff, setDepenseEff] = useState(0);

    //data for entree caisse
    //message and input fields if prevSold is not found
    const [foundPrevSold, setFoundPrevSold] = useState(false);
    const soldCaisse = useSelector (state => state.suiviDepense.soldCaisse);
    const [totalEntreeCaisse, setTotalEntreeCaisse] = useState(0);
    //state for precedent sold caisse 
    const [prevSoldCaisse, setPrevSoldCaisse] = useState(null);

    //get the previous date 
    const prevDate = new Date(year, month -1, day);

    //subtract one day
    prevDate.setDate(prevDate.getDate() - 1);

    const prevYear = prevDate.getFullYear();
    const prevMonth = prevDate.getMonth() + 1;
    const prevDay = prevDate.getDate();

    const {
        customUpdate,
        readOnly,
        loading,
        error,
        entreeCaisseData,
        sortieCaisseData,
        depense_Eff,
        totalDebt,
        yourTotalDebt,
        soldCaisseData,
        customPrevSoldCaisse
    } = useDataFetcherSuiviDepense({ componentName});

    const {
        pCustomUpdate,
        pReadOnly,
        pLoading,
        pError,
        pEntreeCaisse,
        pSoldCaisse,
        pSortieCaisse,
        pDepense_Eff,
        postAndUpdateData
    } = usePostAndUpdate({componentName});


    // track post and update data
    useEffect (() => {

        dispatch(suiviDepenseActions.setUpdate(pCustomUpdate));
        dispatch(suiviDepenseActions.setReadOnly(pReadOnly));
        //data
        dispatch(suiviDepenseActions.setEntreeCaisse(pEntreeCaisse));
        dispatch(suiviDepenseActions.setSortieCaisse(pSortieCaisse));
        dispatch(suiviDepenseActions.setSoldCaisse(pSoldCaisse));
        //depense effectuee data
        setDepenseEff(pDepense_Eff);
              
    }, [pEntreeCaisse, pSortieCaisse, pDepense_Eff,pSoldCaisse]);

    //the fetched data 
    useEffect (() => {

        dispatch(suiviDepenseActions.setUpdate(customUpdate));
        dispatch(suiviDepenseActions.setReadOnly(readOnly));
        //data
        dispatch(suiviDepenseActions.setEntreeCaisse(entreeCaisseData));
        dispatch(suiviDepenseActions.setSortieCaisse(sortieCaisseData));
        dispatch(suiviDepenseActions.setSoldCaisse(soldCaisseData));
        dispatch(suiviDepenseActions.setTotalDette(totalDebt));
        dispatch(suiviDepenseActions.setYourTotalDette(yourTotalDebt));
        //depense effectuee data
        setDepenseEff(depense_Eff);
        //set the prev Sold Caisse
        setPrevSoldCaisse(customPrevSoldCaisse)
        
    }, [entreeCaisseData, sortieCaisseData, pDepense_Eff, totalDebt, yourTotalDebt, customPrevSoldCaisse]);

    // console.log (sortieCaisseData)
    //track the changes state to calculate the previous taped sold caisse by user
    useEffect(() => {

         //for entree caisse 
         if (!prevSoldCaisse) {
            
            setFoundPrevSold(prev => true);
            // set the previous taped  sold caisse by user
            dispatch(suiviDepenseActions.setPrevSoldCaisse((totalDailyDebt + soldCaisse + totalSortieCaisse) - totalEntreeCaisse));
        } else {
            setFoundPrevSold(prev => false);
            dispatch(suiviDepenseActions.setPrevSoldCaisse(prevSoldCaisse.amount));
        };
    },[totalDailyDebt, soldCaisse, totalEntreeCaisse, prevSoldCaisse]);




    function setFilterParams() {

        setterDateParams(date);
    };

    function postData(){
        //post data or create it 
        postAndUpdateData(entreeCaisse, sortieCaisse, false, totalSoldCaisse, totalDailyDebt,totalSortieCaisse, depenseEff, yourTotalDebt);
    };
    
    function updateData() {
        postAndUpdateData(entreeCaisse, sortieCaisse, true, totalSoldCaisse, totalDailyDebt,totalSortieCaisse, depenseEff, yourTotalDebt);
    };

    //call back to update parent state form entree caisse 
    function setTotEntree(data) {
        setTotalEntreeCaisse(data);
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

                <UniqueInput>
                    <label name = 'depenseEffectuee' >Depense Effectuées</label>
                    <input value= {depenseEff} type="number" name = 'depenseEffectuee' onChange={ e => setDepenseEff(Number (e.target.value))} placeholder="Depense effectuée"/>
                </UniqueInput>
                
                <EntreeCaisse 
                    prevYear = {prevYear} 
                    prevMonth = {prevMonth} 
                    prevDay = {prevDay} 
                    setTotEntree = {setTotEntree} 
                    foundPrevSold = {foundPrevSold}
                     loading = {loading || pLoading}
                />
                <SoriteCaisse loading = {loading || pLoading} /> 
                <SoldCaisse loading = {loading || pLoading}/>
                <p> Total Dette du {day}-{month}-{year}: <b> {totalDailyDebt}</b></p>
                <p> Ton total Dette du {day}-{month}-{year}: <b> {yourTotalDette}</b> </p>
                {!update ? <button onClick={postData}> Enregistrer les données</button> : <button onClick={updateData}> Mettre à les données</button> }
                 {pError !== "" && <h3>{pError.response.data.erro.message}</h3>}
                {error !== "" && <h3>{error.response.data.erro.message}</h3>} 
            </div>
        )
    };
};