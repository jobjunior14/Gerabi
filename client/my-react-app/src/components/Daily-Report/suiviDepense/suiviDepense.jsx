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
import searchImage from "../../../assets/searchImage.png";

export default function SuiviDepense (){

    const dispatch = useDispatch();

    //stateAction is here to know wich component is using the data based to current usrl using the Params data
    const {componentName} = useParamsGetter();

    //date params
    const {year, month, day, inexistentDate, setterDateParams} = useDateParams();

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
              
    }, [pEntreeCaisse, pSortieCaisse, pDepense_Eff, pSoldCaisse, pCustomUpdate, pReadOnly ]);

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
        
    }, [entreeCaisseData, sortieCaisseData, pDepense_Eff, totalDebt, yourTotalDebt, customPrevSoldCaisse, depense_Eff]);

    // console.log (sortieCaisseData)
    //track the changes state to calculate the previous taped sold caisse by user
    useEffect(() => {

         //for entree caisse 
         if (!prevSoldCaisse) {
            
            setFoundPrevSold(true);
            // set the previous taped  sold caisse by user
            // dispatch(suiviDepenseActions.setPrevSoldCaisse((totalDailyDebt + soldCaisse + totalSortieCaisse) - totalEntreeCaisse));
        } else {
            setFoundPrevSold(false);
            // dispatch(suiviDepenseActions.setPrevSoldCaisse(prevSoldCaisse.amount));
        };
    },[totalDailyDebt, soldCaisse, totalEntreeCaisse, prevSoldCaisse]);

    function handleDate (name, value) {
        setDate(prev => ({...prev, [name]: value}));
    };
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

    if (inexistentDate) {

        return (
            <>
                <DailyFilter onchange={handleDate}  prev = {date} onclick = {setFilterParams}/>
                <div className=" flex items-center justify-center h-3/4">
                <img className=" h-96 w-auto" src={searchImage} alt="search image" />
                </div>
                <h1 className="text-4xl text-gray-700"> Ouuups!!! vous ne pouvez demander une donnée d'une date inexistante</h1>
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
                    setTotEntree = {setTotEntree} 
                    foundPrevSold = {foundPrevSold}
                    loading = {loading || pLoading}
                />
                <SoriteCaisse key={`sortieCaisse1`} loading = {loading || pLoading} /> 
                <SoldCaisse key={`soldCaisse1`} loading = {loading || pLoading}/>
                <p className="font-bold text-lg lg:text-xl text-gray-700 p-4"> Total Dette du {day}-{month}-{year}: <b> {totalDailyDebt}</b></p>
                <p className="font-bold text-lg lg:text-xl text-gray-700 p-4"> Ton total Dette du {day}-{month}-{year}: <b> {yourTotalDette}</b> </p>
                {!update ? <button className="px-5 py-1 bg-indigo-500 text-gray-100 rounded-md "  onClick={postData}> Enregistrer les données</button> : <button onClick={updateData}> Mettre à les données</button> }
            </>
        )
    };
};