import { useState } from "react";
import sortieCaisseRowSetter from "./sortieCaisseUtils";
import { indexSetterSortieCaisse } from "./sortieCaisseUtils";
import useDateParams from "../../../reuseFunction/dateParams";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5001/api/v1";

export default function usePostAndUpdate ({componentName}) {

    const [pCustomUpdate, setUpdate] = useState(false);
    const [pCeadOnly, setReadOnly] = useState(false);
    const [pLoading, setLoading] = useState(false);
    const [pError, setError] = useState('');
    const [pEntreeCaisse, setEntreeCaisse] = useState(null);
    const [pSortieCaisse, setSortieCaisse] = useState(null);
    const [pDepense_Eff, setDepenseEff] = useState(0);
    const [pTotalDebt, setTotalDebt] = useState(0);
    const [pYourTotalDebt, setYourTotalDebt] = useState(0);
    const [pSoldCaisse, setSoldCaisse] = useState(0);
    const [pCustomPrevSoldCaisse, setPrevSoldCaisse] = useState(0);

    async function postAndUpdateData (entreeCaisse, sortieCaisse, soldCaisse, update, totalSoldCaisse, totDailyDebt, totalSortieCaisse, depenseEff, yourTotalDebt) {
        
    }
}
