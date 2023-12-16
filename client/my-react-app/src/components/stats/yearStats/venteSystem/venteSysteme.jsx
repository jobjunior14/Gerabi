import React from "react";
import Graphique from "../../graphiques";
import { comparaisonDataApex } from "./utils/yearsStatsArrayUtils";
import useDataFetcherYearStats from "./utils/dataFetcher";

export default function VenteSystemGraph (props)  {

    const degoBar = 'degoBar';
    const alimentation = 'alimentation';

    //data for dego bar
    const autreProduit = useDataFetcherYearStats ( {componentName: degoBar, productName: 'autreProduit'});
    const bralima = useDataFetcherYearStats ( {componentName: degoBar, productName: 'bralima'});
    const brasimba = useDataFetcherYearStats ( {componentName: degoBar, productName: 'brasimba'});
    const liqueurs = useDataFetcherYearStats ( {componentName: degoBar, productName: 'liqueurs'});
    //data for alimentation
    const alimAutreProduit = useDataFetcherYearStats ( {componentName: alimentation, productName: 'autreProduit'});
    const alimBralima = useDataFetcherYearStats ( {componentName: alimentation, productName: 'bralima'});
    const alimBrasimba = useDataFetcherYearStats ( {componentName: alimentation, productName: 'brasimba'});
    const alimLiqueurs = useDataFetcherYearStats ( {componentName: alimentation, productName: 'liqueurs'});
    //options for apexChart
    const Alimoptions = {
        chart: {
            id: 'basic-bar'
        },
        xaxis: {
            categories: bralima ? bralima.month : []
        }
    };
    const Degooptions = {
        chart: {
            id: 'basic-bar'
        },
        xaxis: {
            categories: alimBralima ? alimBralima.month : []
        }
    };

    //////////////series for apexChart components 
    //for degoBar 
    const degoVenteBarSerie = comparaisonDataApex({autreProduit, liqueurs, bralima, brasimba }, 'venteBar');
    const degoApprovisionnementSerie = comparaisonDataApex ({autreProduit, liqueurs, bralima, brasimba}, 'approvisionnement');
    const degoBeneficeSerie = comparaisonDataApex({autreProduit, liqueurs, bralima, brasimba}, 'benefice');
    //for alimentation
    const alimVenteBarSerie = comparaisonDataApex({autreProduit : alimAutreProduit, liqueurs: alimLiqueurs, bralima: alimBralima, brasimba: alimBrasimba }, 'venteBar');
    const alimBeneficeSerie = comparaisonDataApex({autreProduit : alimAutreProduit, liqueurs: alimLiqueurs, bralima: alimBralima, brasimba: alimBrasimba}, 'benefice');
    return (
        <div>
            <h1>Comparaison</h1>
            <h2>DegoBar</h2>
            <h2>Vente Bar</h2>
            {!bralima.loading ? <Graphique 
                options={Degooptions}
                series = {degoVenteBarSerie}
                type = 'bar'
                width = '400'            
            /> : <h5>Loading</h5>}
            <h2> Approvisionnement</h2>
            {!bralima.loading ? <Graphique 
                options={Degooptions}
                series = {degoApprovisionnementSerie}
                type = 'bar'
                width = '400'            
            /> : <h5>Loading</h5>}
            <h2>Benefice</h2>
            {!bralima.loading ? <Graphique 
                options={Degooptions}
                series = {degoBeneficeSerie}
                type = 'bar'
                width = '400'            
            /> : <h5>Loading</h5>}

            <h2>Alimentation</h2>
            <h2>Vente Bar</h2>
            {!alimBralima.loading ? <Graphique 
                options={Alimoptions}
                series = {alimVenteBarSerie}
                type = 'bar'
                width = '400'            
            /> : <h5>Loading</h5>}
            
            <h2>Benefice</h2>
            {!alimBralima.loading ? <Graphique 
                options={Alimoptions}
                series = {alimBeneficeSerie}
                type = 'bar'
                width = '400'            
            /> : <h5>Loading</h5>}
        </div>
    )
};