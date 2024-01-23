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
import useParamsGetter from "../../reuseFunction/paramsGetter";
import No_ExistentDate from "../../errorPages/no_existantDate";
export default function SuiviDepense (){

    const dispatch = useDispatch();

    //stateAction is here to know wich component is using the data based to current usrl using the Params data
    const {componentName} = useParamsGetter();

    //date params
    const {year, month, day, no_existent, setterDateParams} = useDateParams();

    //date in fields
    const [date, setDate] = useState ({year, month, day});
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
        entreeCaisseData,
        sortieCaisseData,
        depense_Eff,
        totalDebt,
        yourTotalDebt,
        soldCaisseData,
        prevSoldCaisse,
        error,
        addedSoldCaisse,
    } = useDataFetcherSuiviDepense({ componentName});

    const {
        pCustomUpdate,
        pReadOnly,
        pLoading,
        pEntreeCaisse,
        pSoldCaisse,
        pSortieCaisse,
        pDepense_Eff,
        postAndUpdateData,
        pError,
        pAddedSoldCaisse
    } = usePostAndUpdate({componentName});


    // track post and update data
    useEffect (() => {

        //this condition allows us to limit to render the component 
        if (pEntreeCaisse && pSoldCaisse) {

            dispatch(suiviDepenseActions.setUpdate(pCustomUpdate));
            dispatch(suiviDepenseActions.setReadOnly(pReadOnly));
            //data
            dispatch(suiviDepenseActions.setEntreeCaisse(pEntreeCaisse));
            dispatch(suiviDepenseActions.setSortieCaisse(pSortieCaisse));
            dispatch(suiviDepenseActions.setSoldCaisse(pSoldCaisse));
            //depense effectuee data
            setDepenseEff(pDepense_Eff);
            dispatch(suiviDepenseActions.setPrevSoldCaisse(pAddedSoldCaisse));
        }
    
    }, [pEntreeCaisse, pSortieCaisse, pDepense_Eff, pSoldCaisse, pCustomUpdate, pReadOnly ]);
    

    //the fetched data 
    useEffect (() => {

        if (entreeCaisseData && sortieCaisseData) {

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
    
            //for entree caisse 
            if (!prevSoldCaisse) {
               
               setFoundPrevSold(true)
               // set the previous taped  sold caisse by user
               dispatch(suiviDepenseActions.setPrevSoldCaisse(addedSoldCaisse));
           } else {
               setFoundPrevSold(false);
               dispatch(suiviDepenseActions.setPrevSoldCaisse(prevSoldCaisse.amount));
           }
        }
    }, [entreeCaisseData, sortieCaisseData, pDepense_Eff, totalDebt, yourTotalDebt, prevSoldCaisse, depense_Eff]);


    function handleDate (name, value) {
        setDate(prev => ({...prev, [name]: value}));
    }
    function setFilterParams() {

        setterDateParams(date);
    }

    function postData(){
        //post data or create it 
        postAndUpdateData(entreeCaisse, 
            sortieCaisse, 
            false, 
            totalSoldCaisse, 
            totalDailyDebt,
            totalSortieCaisse, 
            depenseEff, 
            yourTotalDebt, 
            foundPrevSold
        );
    }
    
    function updateData() {
        postAndUpdateData(entreeCaisse, 
            sortieCaisse, 
            true, 
            totalSoldCaisse, 
            totalDailyDebt,
            totalSortieCaisse, 
            depenseEff, 
            yourTotalDebt, 
            foundPrevSold
        );
    }

    if (no_existent) {

        return (
            <>
                <DailyFilter onchange={handleDate}  prev = {date} onclick = {setFilterParams}/>
                <No_ExistentDate/>
            </>
        );
    } else {

        return (
            <>
                <DailyFilter onchange={handleDate} prev = {date} onclick = {setFilterParams} />

                <UniqueInput>
                    <label className="font-bold text-indigo-600 mr-7" name = 'depenseEffectuee' >Depense Effectuées</label>
                    <input 
                        className="h-7 w-28 bg-slate-400 appearance-none rounded-lg pl-2 hover:border-indigo-400 border-2 focus:bg-slate-500 text-white foucus:boder-2 focus:border-indigo-400 focus:outline-none border-gray-500 duration-200"
                        defaultValue= {depenseEff} 
                        type="number" 
                        name = 'depenseEffectuee' 
                        onChange={ e => setDepenseEff(Number (e.target.value))} 
                        placeholder="Depense effectuée"
                    />
                </UniqueInput>
                
                <EntreeCaisse 
                    key={"entreeCaisse1"}
                    prevYear = {prevYear} 
                    prevMonth = {prevMonth} 
                    prevDay = {prevDay} 
                    foundPrevSold = {foundPrevSold}
                    loading = {loading || pLoading}
                    error = {error}
                    pError = {pError}
                />
                <SoriteCaisse key={`sortieCaisse1`} loading = {loading || pLoading} error={error} pError = {pError} /> 
                <SoldCaisse key={`soldCaisse1`} loading = {loading || pLoading} error={error} pError = {pError}/>
                <p className="font-bold text-lg lg:text-xl text-gray-700 p-4 dark:text-gray-100"> Total Dette du {day}-{month}-{year}: <b> {totalDailyDebt}</b></p>
                <p className="font-bold text-lg lg:text-xl text-gray-700 p-4 dark:text-gray-100"> Ton total Dette du {day}-{month}-{year}: <b> {yourTotalDette}</b> </p>
                {!update ? <button className="px-5 py-1 bg-indigo-500 text-gray-100 rounded-md "  onClick={postData}> Enregistrer les données</button> : <button className="px-5 py-1 bg-indigo-500 text-gray-100 rounded-md " onClick={updateData}> Mettre à les données</button> }
            </>
        )
    };
};