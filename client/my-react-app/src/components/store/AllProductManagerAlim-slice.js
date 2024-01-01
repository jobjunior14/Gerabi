import { createSlice } from "@reduxjs/toolkit";

const alimProductSlice = createSlice ({
    name: 'alimProduct',
    initialState: {
        productData: null,
        readOnly: true,
        toggleStoc: true,
        providers: 3,
        update: true,
        id: null,
        vente: null,
    },

    reducers: {

        //set data from API
        setProductdata(state, action) {

            state.productData = action.payload
        },

        //verify if data are already sent to server
        setReadOnly (state, action) {
            state.readOnly = action.payload
        },
        
        //toggle btn to hide useless calcul in stock
        setToggleStoc (state ) {
            state.toggleStoc = !state.toggleStoc;
        },

        //display more providers
        setProvivers ( state) {
            if (state.providers <= 14) state.providers = state.providers + 1;
        },

        //verify if it data come from the server and need to be updated
        setUpdate ( state, action) {
            state.update = action.payload;
        },

        //set data from the server
        setId ( state, action) {

            state.id = action.payload
        },

        //set data from api and manage iput vente Dego field
        setVenteDego (state, action) {

            state.vente = action.payload;
        },

        //manage inputs forms in stock
        handleFormInStock (state, action) {
            
            const modvalue = action.payload.modvalue;
            const id = Number (action.payload.id);
            const objectvalue = action.payload.objectvalue;
            const value = action.payload.value;
            const name = action.payload.name;
            const index = state.productData.findIndex (el => el.id === id);
            const data = state.productData;
            
            if (index !== -1 ){
                if ( modvalue === "" && objectvalue === "" ) {
    
                    data[index] = {...data[index], [name]: value}
                } else if ( objectvalue === "" && modvalue !== "" ) {
    
                    data[index] = {...data[index], [name]: {...data[index][name], [modvalue]: value}}
                };
            };

            state.productData = data;
        },

        //add more product data
        addProduct (state) {

            state.productData.push (
                {
                    name: "",
                    id: state.productData.length + 1,
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
                    business_projection: {
                        stock_gen: 0,
                        sortie_dego: 0,
                        stock_cave: 0,
                        val_stock_det: 0,
                        ref_prix_gros: 0,
                        val_stock_gros: 0,
                        marge_beneficiaire: 0
                    },
                    stock_consignaions: {
                        qt: 0,
                        valeur: 0,
                    },

                    stock_apres_vente: {
                        reste_stock: 0,
                        valeur: 0
                    },

                    benefice_sur_vente: 0,

                    val_precedente: {
                    stock_apres_ventente_rest_stock_comptoir_qt_btll: 0,
                    stock_apres_ventente_rest_stock_depot_qt_btll: 0,
                    },
                },
            );
        },
    }
});

export const alimProductActions = alimProductSlice.actions;

export default alimProductSlice;