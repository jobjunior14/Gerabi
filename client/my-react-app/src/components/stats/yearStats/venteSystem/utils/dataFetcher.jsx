import React from "react";
import { useState, useEffect } from "react";
import useDateParams from "../../../../reuseFunction/dateParams";
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5001/api/v1';

export default function useDataFetcherYearStats ({componentName, productName}) {

   
    const [data, setData] = useState(null);

    const {year} = useDateParams();
    const fetchData = async () => {
        const apiData = await axios.get (`/${componentName}/${productName}/rapportMensuel/yearStats/${year}`);
        setData(apiData.data.stats.stats);
    };

    useEffect (() => {
        fetchData();
    }, [year]);

    return [data];
}