import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Graphique from "../../graphiques";

export default function VenteSystemGraph (props)  {

    const [data, setData] = useState({
        autreProduit: null,
        bralima: null,
        brasimba: null,
        liqueurs: null
    });

    //fetch the data 
    useEffect(() => {
        
        try {

            const fetchData = async () => {
    
                const autreProduitData = await axios.get (`http://localhost:5001/api/v1/${props.name}/autreProduit/rapportMensuel/yearStats/2023`);
                const brasimbaData = await axios.get (`http://localhost:5001/api/v1/${props.name}/brasimba/rapportMensuel/yearStats/2023`);
                const bralimaData = await axios.get (`http://localhost:5001/api/v1/${props.name}/bralima/rapportMensuel/yearStats/2023`);
                const liqueursData = await axios.get (`http://localhost:5001/api/v1/${props.name}/liqueurs/rapportMensuel/yearStats/2023`);

                //set the data
                setData({
                    autreProduit: autreProduitData.data.stats.stats,
                    bralima: bralimaData.data.stats.stats,
                    brasimba: brasimbaData.data.stats.stats,
                    liqueurs: liqueursData.data.stats.stats
                });

            }; fetchData();

        } catch (e) {
            console.log (e);
        }
    }, [props.year, props.name]);
    
};