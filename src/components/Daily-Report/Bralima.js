import { ExcelSecLayout } from "./Excel/Excel-SecLayout"
import { ExcelMain } from "./Excel/Excel-MainLayout"
import React,{useState, useEffect} from "react";

const data = 
[
    {
        id: 0,
        name: "Grand Primus",
        achat_journalier:
        {
            qt_caisse: 8,
            nbr_btll: 12,
            qt_btll: 96,
            prix_achat_gros: 20004,
        },
        benefice_sur_achat:
        {
            val_gros_approvisionnement: 4454,
            val_det: 34234,
            benefice: 4400,
        },
        no_name:
        {
            stock_gen: 128,
            val_stock_det: 234,
            ref_prix_gros: 2500,
            marge_beneficiaire: 48920,
        },
        vente_journaliere:
        {
            ref_prix_det: 4000,
            qt_vendue_comptoir: 9,
            valeur: 94535,
        },
        benefice_sur_vente:34534,
        stock_consignaions:
        {
            qt: 23,
            valeur: 2244,
        },
        stock_apres_vente:
        {
            reste_stock_comptoir:
            {
                qt_btll: 35,
                valeur: 223,
            },
            reste_stock_depot:
            {
                qt_caisses: 7,
                qt_btll: 64,
                valeur: 8399,
            },
            valeur_stock: 479342,
        }


       
    },
    {
        id:1,
        name: "Petit Primus",
        achat_journalier:
        {
            qt_caisse: 8,
            nbr_btll: 12,
            qt_btll: 96,
            prix_achat_gros: 20004,
        },
        benefice_sur_achat:
        {
            val_gros_approvisionnement: 4454,
            val_det: 34234,
            benefice: 4400,
        },
        no_name:
        {
            stock_gen: 128,
            val_stock_det: 234,
            ref_prix_gros: 2500,
            marge_beneficiaire: 48920,
        },
        vente_journaliere:
        {
            ref_prix_det: 4000,
            qt_vendue_comptoir: 9,
            valeur: 94535,
        },
        benefice_sur_vente:34534,
        stock_consignaions:
        {
            qt: 23,
            valeur: 2244,
        },
        stock_apres_vente:
        {
            reste_stock_comptoir:
            {
                qt_btll: 35,
                valeur: 223,
            },
            reste_stock_depot:
            {
                qt_caisses: 7,
                qt_btll: 64,
                valeur: 8399,
            },
            valeur_stock: 479342,
        }


       
    },
    {
        id: 4,
        name: "Grand Primus",
        achat_journalier:
        {
            qt_caisse: 8,
            nbr_btll: 12,
            qt_btll: 96,
            prix_achat_gros: 20004,
        },
        benefice_sur_achat:
        {
            val_gros_approvisionnement: 4454,
            val_det: 34234,
            benefice: 4400,
        },
        no_name:
        {
            stock_gen: 128,
            val_stock_det: 234,
            ref_prix_gros: 2500,
            marge_beneficiaire: 48920,
        },
        vente_journaliere:
        {
            ref_prix_det: 4000,
            qt_vendue_comptoir: 9,
            valeur: 94535,
        },
        benefice_sur_vente:34534,
        stock_consignaions:
        {
            qt: 23,
            valeur: 2244,
        },
        stock_apres_vente:
        {
            reste_stock_comptoir:
            {
                qt_btll: 35,
                valeur: 223,
            },
            reste_stock_depot:
            {
                qt_caisses: 7,
                qt_btll: 64,
                valeur: 8399,
            },
            valeur_stock: 479342,
        }


       
    },
];

export function Bralima ()
{
    const [bralimaData, setBralimadata] = useState (data);
    function Updating_Form ( id, name, value, type, modvalue, objectvalue )
    {
        setBralimadata (
            prev => {
                if (modvalue === "" && objectvalue === "")
                {
                    return prev.map ( (data) =>
                        {
                            return data.id === id ? { ...data, name: value } : data
                        })
                }
                else if ( objectvalue === "" )
                {
                    return prev.map ( (data) =>
                    {
                        return data.id === id ? { ...data, name: {...data.name, modvalue: value } } : data
                    })
                }
                else 
                {
                    return prev.map ( (data) =>
                    {
                        return data.id === id ? { ...data, name: {...data.name, objectvalue: {...data.name.objectvalue, [modvalue]: value} } } : data
                    })
                }
            }
        )
    };

    let displayDataMainExcel = bralimaData.map (
        prev => {
            return (
                <ExcelMain 
                    prev = { prev }
                    key = { prev.id }
                    onchange = { Updating_Form }
                />
            )
        }
    );

    return (
        <div>
            <ExcelSecLayout name = {displayDataMainExcel} total = '12'/>
        </div>
    )
}
