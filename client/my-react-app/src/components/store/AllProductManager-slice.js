import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice ({
    name: 'product',
    initialState: {
        productData: null,
        readOnly: true,
        toggleStoc: true,
        providers: 3,
        update: true,
        id: null,
        vente: null,
        date: {
            year: Number(new Date().getFullYear()),
            month: Number(new Date().getMonth() + 1),
            day: Number(new Date().getDate()),
        },
        errorMessage: {
            
            status: false,
            errorsAllowed: true,
            message: ""
        },
        product: true
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
        setToggleStoc (state, action ) {
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
                } else{
    
                    data[index] = {...data[index], [name]: {...data[index][name], [modvalue]: {...data[index][name][modvalue], [objectvalue]: value}}}
                };
            };

            state.productData = data;
        },

        //manage inputs fields in suiviAppro (TD fields)
        handleTdFormInSuivi (state, action) {

            const id = Number (action.payload.id);
            const name = action.payload.name;
            const value = action.payload.value;
            const path = action.payload.path;
            const data = state.productData
            const index = data.findIndex (el => el.id === id)

            if ( index !== -1) {

                data[index] = {...data[index], [path]: {...data[index][path], [name]: value}}
            };

            state.productData = data;
        },

        //manage inputs filds in suiviAppro (TH fields)
        handleThFormInSuivi (state, action) {

            const name = action.payload.name;
            const value = action.payload.value;
            const data = state.productData;

            state.productData = data.map( data => {

                    return {...data, [name]: {...data[name], name: value}};
            });
        },

        //add more product data
        addProduct (state) {

            const lengthProd = state.productData.length 
            state.productData.push (
                {
                    name: "",

                    id: lengthProd + 1,

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
                    sortie_cave: 0,
                    stock_gen: 0,
                    stock_dego: 0,
                    val_stock_det: 0,
                    ref_prix_gros: 0,
                    val_stock_gros: 0,
                    marge_beneficiaire: 0,
                    },

                    stock_consignaions: {
                    qt: 0,
                    valeur: 0,
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
                    valeur_stock: 0
                    },

                    benefice_sur_vente: 0,

                    val_precedente: {
                    stock_apres_ventente_rest_stock_comptoir_qt_btll: 0,
                    stock_apres_ventente_rest_stock_depot_qt_btll: 0,
                    },

                    suivi1: {
                    name: lengthProd > 0 ? state.productData[0].suivi1.name : '',
                    qt_caisse: 0,
                    },

                    suivi2: {
                    name: lengthProd > 0 ? state.productData[0].suivi2.name : '',
                    qt_caisse: 0,
                    },

                    suivi3: {
                    name: lengthProd > 0 ? state.productData[0].suivi3.name : '',
                    qt_caisse: 0,
                    },

                    suivi4: {
                    name: lengthProd > 0 ? state.productData[0].suivi4.name : '',
                    qt_caisse: 0,
                    },

                    suivi5: {
                    name: lengthProd > 0 ? state.productData[0].suivi5.name : '',
                    qt_caisse: 0,
                    },

                    suivi6: {
                    name: lengthProd > 0 ? state.productData[0].suivi6.name : '',
                    qt_caisse: 0,
                    },

                    suivi7: {
                    name: lengthProd > 0 ? state.productData[0].suivi7.name : '',
                    qt_caisse: 0,
                    },

                    suivi8: {
                    name: lengthProd > 0 ? state.productData[0].suivi8.name : '',
                    qt_caisse: 0,
                    },

                    suivi9: {
                    name: lengthProd > 0 ? state.productData[0].suivi9.name : '',
                    qt_caisse: 0,
                    },

                    suivi10: {
                    name: lengthProd > 0 ? state.productData[0].suivi10.name : '',
                    qt_caisse: 0,
                    },

                    suivi11: {
                    name: lengthProd > 0 ? state.productData[0].suivi11.name : '',
                    qt_caisse: 0,
                    },

                    suivi12: {
                    name: lengthProd > 0 ? state.productData[0].suivi12.name : '',
                    qt_caisse: 0,
                    },

                    suivi13: {
                    name: lengthProd > 0 ? state.productData[0].suivi13.name : '',
                    qt_caisse: 0,
                    },

                    suivi14: {
                    name: lengthProd > 0 ? state.productData[0].suivi14.name : '',
                    qt_caisse: 0,
                    },
                },
            );
        },

        //manage date field 
        setDate (state, action) {

            if (action.payload.year) {

                state.date = {
                    year: action.payload.year,
                    month: action.payload.month,
                    day: action.payload.day
                };

            } else {
                
                const name = action.payload.name;
                const value = action.payload.value;
    
                state.date = {
                    ...state.date, [name]: value
                };
            }
        },

        setErrorMessage (state, action) {
            state.errorMessage = {
                status: action.payload.status,
                errorsAllowed: action.payload.errorsAllowed,
                message: action.payload.message
            };
        },
        setproduct (state, action) {
            state.product = action.payload;
        }
    }
});

export const productActions = productSlice.actions;

export default productSlice;