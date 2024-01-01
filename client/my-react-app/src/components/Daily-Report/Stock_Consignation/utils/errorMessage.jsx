import { useState } from "react";

export default function useErroMessage ( {refVenteJournaliere, componentName} ) {

    const [errObj,  setErrObj] =  useState({
        status: true,
        errorAllowed: false,
        message: ''
    });

    
    const setTheErrorMessage = (initialize, array, update, venteJournaliere) => {
        //initialize the error message object
        if (initialize) {
            setErrObj (prev => {return {status: true, errorAllowed: false, message: ""}});
        } else {

            if (venteJournaliere <= 0) {

                refVenteJournaliere.current.focus();
                    setErrObj(prev => {return {status: true, errorAllowed: false, message: "Verifier la section vente journaliere"}});
            } else {
                //for dego bar
                if (componentName === 'degoBar' && !update) {
                    //itterate the array by searching errors
                    for (let i of array) {
        
                        if (((i.suivi1.name === '' && i.suivi1.qt_caisse > 0 ) || i.suivi1.name === '')  ) {
          
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide ou aucun produit ne peut ne pas avoir de fournisseur. Section *Suivi Approvisionnement* "}});
                        break;
                        } else if ((i.suivi2.name === '' && i.suivi2.qt_caisse > 0) ) {
                
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide. Section *Suivi Approvisionnement*"}});
                        break;
                        } else if ((i.suivi3.name === '' && i.suivi3.qt_caisse > 0) ) {
                
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide. Section *Suivi Approvisionnement*"}});
                        break;
                        } else if ((i.suivi4.name === '' && i.suivi4.qt_caisse > 0) ) {
                
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide. Section *Suivi Approvisionnement*"}});
                        break;
                        } else if ((i.suivi5.name === '' && i.suivi5.qt_caisse > 0) ) {
                
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide. Section *Suivi Approvisionnement*"}});
                        break;
                        } else if ((i.suivi6.name === '' && i.suivi6.qt_caisse > 0) ) {
                
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide. Section *Suivi Approvisionnement*"}});
                        break;
                        } else if ((i.suivi7.name === '' && i.suivi7.qt_caisse > 0) ) {
                
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide. Section *Suivi Approvisionnement*"}});
                        break;
                        } else if ((i.suivi8.name === '' && i.suivi8.qt_caisse > 0) ) {
                
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide. Section *Suivi Approvisionnement*"}});
                        break;
                        } else if ((i.suivi9.name === '' && i.suivi9.qt_caisse > 0) ) {
                
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide. Section *Suivi Approvisionnement*"}});
                        break;
                        } else if ((i.suivi10.name === '' && i.suivi10.qt_caisse > 0) ) {
                
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide. Section *Suivi Approvisionnement*"}});
                        break;
                        } else if ((i.suivi11.name === '' && i.suivi11.qt_caisse > 0) ) {
                
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide. Section *Suivi Approvisionnement*"}});
                        break;
                        } else if ((i.suivi12.name === '' && i.suivi12.qt_caisse > 0) ) {
                
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide. Section *Suivi Approvisionnement*"}});
                        break;
                        } else if ((i.suivi13.name === '' && i.suivi13.qt_caisse > 0) ) {
                
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide. Section *Suivi Approvisionnement*"}});
                        break;
                        } else if ((i.suivi14.name === '' && i.suivi14.qt_caisse > 0) ) {
                
                            setErrObj( prev => {return {status: true, errorAllowed: false, message: " Aucune valeur superieure à 0 ne peut ne pas etre relier à un nom de fournisseur vide. Section *Suivi Approvisionnement*"}});
                        break;
                        } else {
                
                            setErrObj( prev => {return {status: false, errorAllowed: true, message: "Les données sans nom sera automatiquement supprimées, clicker encore sur *Enregistrer les données*"}});
                        };
                    }
                } else if (componentName === 'alimentation' && !update) {
                    setErrObj(prev => {return {status: false, errorAllowed: true, message: "Les données sans nom sera automatiquement supprimées, clicker encore sur *Enregistrer les données*"}});
                } else {
                    setErrObj (prev => {return {status: false, errorAllowed: true, message: "Vous vous appretez à mettre vos données a jour, clicker encore sur *Mette à jour les données"}});
                };
            };
        };
    };
    return {errObj, setTheErrorMessage};
};