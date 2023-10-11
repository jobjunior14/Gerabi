import { createContext, useContext, useState } from "react";

const ObjContext = createContext(undefined);

export const ObjProvider = ({children}) => {

    const obj = useState  ({
        
        name: "",
        
        achat_journalier:
        {
            qt_caisse:0,
            nbr_btll: 0,
            qt_btll: 0,
            prix_achat_gros: 0
        },

        benefice_sur_achat: {
            val_gros_approvisionnement: 0,
            val_det: 0,
            benefice: 0
        },

        vente_journaliere:
        {
            ref_prix_det: 0,
            qt_vendue_comptoir: 0,
            valeur: 0
        },

        business_projection:
        {
            sortie_cave: 0,
            stock_gen: 0,
            stock_dego: 0,
            val_stock_det: 0,
            ref_prix_gros: 0,
            val_stock_gros: 0,
            marge_beneficiaire: 0
        },

        stock_consignaions:
        {
            qt: 0,
            valeur: 0
        },

        stock_apres_vente:
        {
            reste_stock_comptoir:
            {
                qt_btll: 0,
                valeur: 0
            },
            reste_stock_depot:
            {
                qt_caisses: 0,
                qt_btll: 56,
                valeur: 224000
            }
        },

        benefice_sur_vente:0,

        val_precedente:
        {
            stock_apres_ventente_rest_stock_comptoir_qt_btll: 0,
            stock_apres_ventente_rest_stock_depot_qt_btll: 0
        },
        
        suivi1: {

            name: "",
            qt_caisse: 0
        },
    
        suivi2: {

            name: "",
            qt_caisse: 0
        },
    
        suivi3: {

            name: "",
            qt_caisse: 0
        },
    
        suivi4: {

            name: "",
            qt_caisse: 0
        },
    
        suivi5: {

            name: "",
            qt_caisse: 0
        },
    
        suivi6: {

            name: "",
            qt_caisse: 0
        },
    
        suivi7: {

            name: "",
            qt_caisse: 0
        },
    
        suivi8: {

            name: "",
            qt_caisse: 0
        },
    
        suivi9: {

            name: "",
            qt_caisse: 0
        },
    
        suivi10: {

            name: "",
            qt_caisse: 0
        },
    
        suivi11: {

            name: "",
            qt_caisse: 0
        },
    
        suivi12: {

            name: "",
            qt_caisse: 0
        },
    
        suivi13: {

            name: "",
            qt_caisse: 0
        },
    
        suivi14: {

            name: "",
            qt_caisse: 0
        }
    });
    


    return <ObjContext.Provider value={{obj}}></ObjContext.Provider>;
};

export const useObj = () => useContext(ObjContext)