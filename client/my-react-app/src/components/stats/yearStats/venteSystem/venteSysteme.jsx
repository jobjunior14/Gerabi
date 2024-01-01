import React from "react";
import Graphique from "../../graphiques";
import { comparaisonDataApex } from "./utils/yearsStatsArrayUtils";
import useDataFetcherYearStats from "./utils/dataFetcher";

export default function VenteSystemGraph ({graphicWidth, checkWidth})  {

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
            <h1 className="lg:text-4xl text-3xl font-bold text-gray-800 my-5">Comparaison&nbsp;Annuelle</h1>
            <div className="border-2 border-slate-400 rounded-lg px-5 py-5">
                <h2 className=" bg-gray-800  rounded-lg p-4 lg:text-3xl text-2xl font-normal text-gray-200 mb-5">DegoBar</h2>
                <div className=" px-4" >
                    <div className="flex justify-center">
                        <h2 className="lg:text-xl text-lg font-light text-gray-600 my-5 absolute">Vente Bar</h2>
                        <div className="border-2 border-slate-400 p-4 overflow-x-auto max-w-fit mt-14 rounded-lg">
                            {!bralima.loading ? <Graphique 
                                options={Degooptions}
                                series = {degoVenteBarSerie} 
                                type = 'bar'
                                width = {`${ !checkWidth ? graphicWidth : 400}`}          
                            /> : <h5>Loading</h5>}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <h2 className="lg:text-xl text-lg font-light text-gray-600 my-5 absolute"> Approvisionnement</h2>
                        <div className="border-2 border-slate-400 p-4 overflow-x-auto max-w-fit mt-14 rounded-lg">
                            {!bralima.loading ? <Graphique 
                                options={Degooptions}
                                series = {degoApprovisionnementSerie}
                                type = 'bar'
                                width = {`${ !checkWidth ? graphicWidth : 400}`}            
                            /> : <h5>Loading</h5>}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <h2 className="lg:text-xl text-lg font-light text-gray-600 my-5 absolute">Benefice</h2>
                        <div className="border-2 border-slate-400 p-4 overflow-x-auto max-w-fit mt-14 rounded-lg">
                            {!bralima.loading ? <Graphique 
                                options={Degooptions}
                                series = {degoBeneficeSerie}
                                type = 'bar'
                                width = {`${ !checkWidth ? graphicWidth : 400}`}            
                            /> : <h5>Loading</h5>}
                        </div>
                    </div>
                </div>
                
                <h2 className=" bg-gray-800  rounded-lg p-4 lg:text-3xl text-2xl font-normal text-gray-200 my-5">Alimentation</h2>
                <div className=" px-4">
                    <div className="flex justify-center">
                        <h2 className="lg:text-xl text-lg font-light text-gray-600 my-5 absolute">Vente Bar</h2>
                        <div className="border-2 border-slate-400 p-4 overflow-x-auto max-w-fit mt-14 rounded-lg">
                            {!alimBralima.loading ? <Graphique 
                                options={Alimoptions}
                                series = {alimVenteBarSerie}
                                type = 'bar'
                                width = {`${ !checkWidth ? graphicWidth : 400}`}            
                            /> : <h5>Loading</h5>}
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <h2 className="lg:text-xl text-lg font-light text-gray-600 my-5 absolute">Benefice</h2>
                        <div className="border-2 border-slate-400 p-4 overflow-x-auto max-w-fit mt-14 rounded-lg">
                            {!alimBralima.loading ? <Graphique 
                                options={Alimoptions}
                                series = {alimBeneficeSerie}
                                type = 'bar'
                                width = {`${ !checkWidth ? graphicWidth : 400}`}            
                            /> : <h5>Loading</h5>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};