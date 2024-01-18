import { useState } from "react";
import sortieCaisseRowSetter from "./sortieCaisseUtils";
import { indexSetterSortieCaisse } from "./sortieCaisseUtils";
import useDateParams from "../../../reuseFunction/dateParams";
import { deleteEmptyNameSortieCaisse } from "./sortieCaisseUtils";
import formatDate from "../../../reuseFunction/rightFormatDate";
import axios from "../../../../axiosUrl";
import indexSetter from "../../../reuseFunction/indexSetter";


export default function usePostAndUpdate ({componentName}) {

    const [pCustomUpdate, setUpdate] = useState(false);
    const [pReadOnly, setReadOnly] = useState(false);
    const [pLoading, setLoading] = useState(false);
    const [pError, setError] = useState('');
    const [pEntreeCaisse, setEntreeCaisse] = useState(null);
    const [pSortieCaisse, setSortieCaisse] = useState(null);
    const [pDepense_Eff, setDepenseEff] = useState(0);
    const [pSoldCaisse, setSoldCaisse] = useState(0);
    
    const {year, month, day} = useDateParams();

    async function postAndUpdateData (entreeCaisse, sortieCaisse, update, totalSoldCaisse, totDailyDebt, totalSortieCaisse, depenseEff, yourTotalDebt) {

        setLoading(true);
        try {
            //variable stocking the date of the created data
            const createdAt = formatDate(year, month, day);
    
            //deleting empty name and add the created date to every object in our data
            const newSortieData = deleteEmptyNameSortieCaisse(sortieCaisse, createdAt);
            //deleting empty name and add the created date to every object in our data
            const newEntreeCaisse = entreeCaisse.map(el => {
                return {...el, data: {...el.data, createdAt}}
            }).filter (el => el !== "");
    
            const suiviDepenseData = {
                data:{
                    data: {
                        entreeCaisse: newEntreeCaisse,
                        sortieCaisse: newSortieData,
                        soldCaisse: {
                            amount: (Number (totalSoldCaisse) + yourTotalDebt) - (Number (totalSortieCaisse) + Number(totDailyDebt)),
                            createdAt: createdAt
                        }
                    }
                }
            };


            const responseSuiviDepense = !update ?  await axios.post(`/${componentName}/suiviDepense/rapportJournalier?year=${year}&month=${month}&day=${day}`, suiviDepenseData) : 
                await axios.post(`/${componentName}/suiviDepense/rapportJournalier/${year}/${month}/${day}`, suiviDepenseData);
            const responseDepenseEff = update ? await axios.post( `/${componentName}/depenseEff/${year}/${month}/${day}`, {valeur: depenseEff, createdAt: createdAt} ) : 
                await axios.post( `/${componentName}/depenseEff?year=${year}&month=${month}&day=${day}`, {valeur: depenseEff, createdAt: createdAt});

            if (responseSuiviDepense.data.data.sortieCaisse) {

                //set all the data in sortie caisse to the same row 
                const save_sortieCaisse = sortieCaisseRowSetter(responseSuiviDepense.data.data.sortieCaisse);
                //set the sortie caisse data
                setSortieCaisse(indexSetterSortieCaisse(save_sortieCaisse));
                //set the entree caisse data
                setEntreeCaisse(indexSetter(responseSuiviDepense.data.data.entreeCaisse));
                //set the sold caisse data
                setSoldCaisse(responseSuiviDepense.data.data.soldCaisse.amount);
                setUpdate(true);
                setReadOnly(true);

                //set the depense effectuee data
                setDepenseEff(responseDepenseEff.data.data.day.valeur);
            }

        } catch (e) {
            setError(e);
            setLoading(false);
        } finally {
            setLoading(false);
        };
    };

    return {
        pCustomUpdate,
        pReadOnly,
        pLoading,
        pError,
        pEntreeCaisse,
        pSoldCaisse,
        pSortieCaisse,
        pDepense_Eff,
        postAndUpdateData
    };
}
