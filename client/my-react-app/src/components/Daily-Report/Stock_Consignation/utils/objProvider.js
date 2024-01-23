export default function objProvider (componentName, el, index) {

    let data = {
        name: el.name,
        id: index,
        achat_journalier: {
        qt_caisse: 0,
        nbr_btll: 0,
        qt_btll: 0,
        prix_achat_gros: 0,
        },
        benefice_sur_achat: {
        val_gros_approvisionnement: 0,
        val_det: 0,
        benefice: 0,
        },
        vente_journaliere: {
        ref_prix_det: 0,
        qt_vendue_comptoir: 0,
        valeur: 0,
        },
        stock_consignaions: {
            qt: 0,
            valeur: 0,
        },
        benefice_sur_vente: 0,
        val_precedente: {
            stock_apres_ventente_rest_stock_comptoir_qt_btll: el.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll || 0,
            stock_apres_ventente_rest_stock_depot_qt_btll: el.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll || 0,
        },
    }

    if (componentName === 'degoBar') {

        data = {...data,
            business_projection: {
                sortie_cave: 0,
                stock_gen: 0,
                stock_dego: 0,
                val_stock_det: 0,
                ref_prix_gros: 0,
                val_stock_gros: 0,
                marge_beneficiaire: 0,
            },
            stock_apres_vente: {
                reste_stock_comptoir: {
                    qt_btll: 0,
                    valeur: 0,
                },
                reste_stock_depot: {
                    qt_caisses: 0,
                    qt_btll: 0,
                    valeur: 0,
                },
            },
            suivi1: {
                name: el.suivi1.name || "",
                qt_caisse: 0,
            },
            suivi2: {
                name: el.suivi2.name || "",
                qt_caisse: 0,
            },
            suivi3: {
                name: el.suivi3.name || "",
                qt_caisse: 0,
            },
            suivi4: {
                name: el.suivi4.name || "",
                qt_caisse: 0,
            },
            suivi5: {
                name: el.suivi5.name || "",
                qt_caisse: 0,
            },
            suivi6: {
                name: el.suivi6.name || "",
                qt_caisse: 0,
            },
            suivi7: {
                name: el.suivi7.name || "",
                qt_caisse: 0,
            },
            suivi8: {
                name: el.suivi8.name || "",
                qt_caisse: 0,
            },
            suivi9: {
                name: el.suivi9.name || "",
                qt_caisse: 0,
            },
            suivi10: {
                name: el.suivi10.name || "",
                qt_caisse: 0,
            },
            suivi11: {
                name: el.suivi11.name || "",
                qt_caisse: 0,
            },
            suivi12: {
                name: el.suivi12.name || "",
                qt_caisse: 0,
            },
            suivi13: {
                name: el.suivi13.name || "",
                qt_caisse: 0,
            },
            suivi14: {
                name: el.suivi14.name || "",
                qt_caisse: 0,
            },
        };  
    } else {
        data = {...data, 
            business_projection: {
                sortie_dego: 0,
                stock_gen: 0,
                stock_cave: 0,
                val_stock_det: 0,
                ref_prix_gros: 0,
                val_stock_gros: 0,
                marge_beneficiaire: 0
            },
            stock_apres_vente: {
                reste_stock: 0,
                valeur: 0
            },
        };
    }
    return data;
}

