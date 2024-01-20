import { useState, useEffect } from "react";
import useDateParams from "../../../reuseFunction/dateParams";
import indexSetter from "../../../reuseFunction/indexSetter";
import axios from "../../../../axiosUrl";
import sortieCaisseRowSetter from "./sortieCaisseUtils";
import { indexSetterSortieCaisse } from "./sortieCaisseUtils";
import useTokenError from "../../../errorPages/tokenError";
export default function useDataFetcherSuiviDepense ({componentName}) {

    const [customUpdate, setUpdate] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [entreeCaisseData, setEntreeCaisse] = useState(null);
    const [sortieCaisseData, setSortieCaisse] = useState(null);
    const [depense_Eff, setDepenseEff] = useState(0);
    const [totalDebt, setTotalDebt] = useState(0);
    const [yourTotalDebt, setYourTotalDebt] = useState(0);
    const [soldCaisseData, setSoldCaisse] = useState(0);
    const [customPrevSoldCaisse, setPrevSoldCaisse] = useState(0);

    const headers = {
        headers: {
            "content-type": "application/json", 'withCredentials': true,
            'authorization': `Bearer ${localStorage.getItem('jwtA')}`
        }
    };
    //date params
    const {year, month, day} = useDateParams();
    //get the previous date 
    const prevDate = new Date(year, month -1, day);

    //subtract one day
    prevDate.setDate(prevDate.getDate() - 1);

    const prevYear = prevDate.getFullYear();
    const prevMonth = prevDate.getMonth() + 1;
    const prevDay = prevDate.getDate();

    const fetchData = async () => {

        setLoading(true);
        try {
            
            const suiviDepenseData = await axios.get (`/${componentName}/suiviDepense/rapportJournalier/${year}/${month}/${day}`, headers);
            const totDette = await axios.get (`/${componentName}/suiviDette/rapportJournalier/totDette/${year}/${month}/${day}`, headers);
            const yourTotDette = await axios.get (`/${componentName}/yourSuiviDette/rapportJournalier/totDette/${year}/${month}/${day}`, headers);
            const depenseEffData = await axios.get (`/${componentName}/depenseEff/${year}/${month}/${day}`, headers);
            //previous sold caisse for entree caisse 
            const prevSuiviDepenseData = await axios.get (`/${componentName}/suiviDepense/rapportJournalier/${prevYear}/${prevMonth}/${prevDay}`, headers);
            //set the deppense effectuée section
            if (depenseEffData.data.data.day) setDepenseEff(depenseEffData.data.data.day.valeur);
            //set the total amout of debt
            setTotalDebt(totDette.data.data);
            //set *your* total amount debt 
            //*your * refer to the user/
            setYourTotalDebt(yourTotDette.data.data);
            
            if (suiviDepenseData.data.data.sortieCaisse.length > 0 && suiviDepenseData.data.data.entreeCaisse.length > 0  && suiviDepenseData.data.data.soldCaisse) {
                
                //readOnly is the state to set the some inputs to readonly and update is the state to know if 
                //the data is being updated or sending it as a new data to the server
                setUpdate(true);
                setReadOnly(true);
                //set all the data in sortie caisse to the same row 
                const save_sortieCaisse = sortieCaisseRowSetter(suiviDepenseData.data.data.sortieCaisse);
                //set the sortie caisse data 
                setSortieCaisse(indexSetterSortieCaisse(save_sortieCaisse));
                
                //set the entree caisse data
                setEntreeCaisse(indexSetter(suiviDepenseData.data.data.entreeCaisse));
                //set the sold caisse
                if (suiviDepenseData.data.data.soldCaisse) setSoldCaisse(suiviDepenseData.data.data.soldCaisse.amount);
            } else {
                
                setReadOnly(false);
                setUpdate(false);
                
                const lastCreatedData = await axios.get(`/${componentName}/suiviDepense/lastElement/${year}/${month}`, headers);
                if (lastCreatedData.data.data) {
                    
                    if (lastCreatedData.data.data.sortieCaisse) {
                        const save_sortieCaisse = sortieCaisseRowSetter(lastCreatedData.data.data.sortieCaisse);
                        setSortieCaisse(indexSetterSortieCaisse(save_sortieCaisse));
                    }
                    setEntreeCaisse(indexSetter(lastCreatedData.data.data.entreeCaisse));
                    
                } else {
                    setReadOnly(false);
                    setUpdate(false);
                    setEntreeCaisse([]);
                    setSortieCaisse([]);
                    setSoldCaisse([]);
                }
            }

            //set the previous sold caisse
            setPrevSoldCaisse(prevSuiviDepenseData.data.data.soldCaisse);

        } catch (error) {
            setError(error);
            setLoading(false);
        }  finally {
            setLoading(false);
        }
    };

    useEffect (() => {
        fetchData();
    }, [year, month, day, componentName]);

    //****************redirect to the login page if login error************* */
            useTokenError(error);
/////////////////////*************/////////////////// */


    return {
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
    }
}