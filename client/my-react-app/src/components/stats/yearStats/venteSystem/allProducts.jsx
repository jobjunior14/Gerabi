import React from "react";
import { useEffect } from "react";
import Graphique from "../../graphiques";
import useDataFetcherYearStats from "./utils/dataFetcher";
export default function AllProductGraph ({componentName, productName}) {



    //hook to fetch data 
    const [data] = useDataFetcherYearStats({componentName: componentName, productName: productName});

    const venteBar = [];
    const approvisionnement = [];
    const benefice = [];
    const month = [];
    
    useEffect(() => {

        if (data) {
            if (data.length > 0) {
                for (let i of data) {
                    venteBar.push(i.vente_bar);
                    approvisionnement.push(i.approvisionnement);
                    benefice.push(i.benefice);
                    if (i._id.mois === 1) {
                        month.push('Janvier');
                    } else if (i._id.mois === 2) {
                        month.push('Fevrier');
                    } else if (i._id.mois === 3) {
                        month.push('Mars');
                    } else if (i._id.mois === 4) {
                        month.push('Avril');
                    } else if (i._id.mois === 5) {
                        month.push('Mai');
                    } else if (i._id.mois === 6) {
                        month.push('Juin');
                    } else if (i._id.mois === 7) {
                        month.push('Jouillet');
                    } else if (i._id.mois === 8) {
                        month.push('Aout');
                    } else if (i._id.mois === 9) {
                        month.push('Septembre');
                    } else if (i._id.mois === 10) {
                        month.push('Octobre');
                    } else if (i._id.mois === 11) {
                        month.push('Novembre');
                    } else {
                        month.push('Decembre');
                    };
                };
            };
        };

    }, [data]);

    const options = {
        chart: {
            id: 'basic-bar'
        },
        xaxis: {
            categories: month
        }
    }

    let series = [];

    componentName === 'degoBar' ? series = [
        {
            name: 'vente Bar',
            data: venteBar
        },
        {
            name: 'approvisionnemnt',
            data: approvisionnement
        },
        {
            name: 'Benefice',
            data: benefice
        }
    ] : series = [
        {
            name: 'vente Bar',
            data: venteBar
        },
        {
            name: 'Benefice',
            data: benefice
        }
    ]
     
    if (data) {

        if (data.length > 0) { 
            return (
                <div>
                    <h3>{productName}</h3>
                    <Graphique options = {options} series = {series} type = 'bar' width = '300' />
                </div>
            );
        } else {
            return (<div>
                <h3>{productName}</h3>
                <h2> Il n'a pas des donnees pour cette date</h2>
            </div>);
        }
    } else {
        return (<h1>Loading....</h1>);
    }
}