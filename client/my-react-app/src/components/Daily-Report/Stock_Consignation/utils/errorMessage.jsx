import { useState, useRef } from "react";

export default function useErroMessage (array, refVenteJournaliere, update, venteJournaliere, componentName ) {

    const [errMessage,  setErrMessage] =  useState({
        status: true,
        errorAllowed: true,
        message: ''
    });

    if (venteJournaliere <= 0) {
        refVenteJournaliere.current.focus();
            setErrMessage(prev => {return {status: true, errorAllowed: false, message: "verifier la section vente journaliere"}});
    } else {
        //for dego bar
        if (componentName === 'degoBar' && !update) {

            for (let i of array) {

                if (((i.suivi1.name === '' && i.suivi1.qt_caisse > 0 ) || i.suivi1.name === '')  ) {
  
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide ou aucun produit ne peut ne pas avoir de fournisseur"}});
                break;
                } else if ((i.suivi2.name === '' && i.suivi2.qt_caisse > 0) ) {
        
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}});
                break;
                } else if ((i.suivi3.name === '' && i.suivi3.qt_caisse > 0) ) {
        
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}});
                break;
                } else if ((i.suivi4.name === '' && i.suivi4.qt_caisse > 0) ) {
        
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}});
                break;
                } else if ((i.suivi5.name === '' && i.suivi5.qt_caisse > 0) ) {
        
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}});
                break;
                } else if ((i.suivi6.name === '' && i.suivi6.qt_caisse > 0) ) {
        
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}});
                break;
                } else if ((i.suivi7.name === '' && i.suivi7.qt_caisse > 0) ) {
        
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}});
                break;
                } else if ((i.suivi8.name === '' && i.suivi8.qt_caisse > 0) ) {
        
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}});
                break;
                } else if ((i.suivi9.name === '' && i.suivi9.qt_caisse > 0) ) {
        
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}});
                break;
                } else if ((i.suivi10.name === '' && i.suivi10.qt_caisse > 0) ) {
        
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}});
                break;
                } else if ((i.suivi11.name === '' && i.suivi11.qt_caisse > 0) ) {
        
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}});
                break;
                } else if ((i.suivi12.name === '' && i.suivi12.qt_caisse > 0) ) {
        
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}});
                break;
                } else if ((i.suivi13.name === '' && i.suivi13.qt_caisse > 0) ) {
        
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}});
                break;
                } else if ((i.suivi14.name === '' && i.suivi14.qt_caisse > 0) ) {
        
                    setErrMessage( prev => {return {status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}});
                break;
                } else {
        
                    setErrMessage( prev => {return {status: false, errorAllowed: true, message: "Toute donnée sans nom sera automaticament supprimée, clicker encore sur *Enregistrer les données*"}});
                };
            }
        };
        //for alimentation components
        if (componentName === 'alimentation' && !update) {
            setErrMessage(prev => {return {status: false, errorAllowed: true, message: "Toute donnée sans nom sera automaticament supprimée, clicker encore sur *Enregistrer les données*"}});
        } else {
            setErrMessage (prev => {return {status: false, errorAllowed: true, message: "vous vous appretez a mettre vos donnees a jour les donnees, clicker encore sur *Mette a jour les donnees"}});
        }
    }

    return errMessage;
 }