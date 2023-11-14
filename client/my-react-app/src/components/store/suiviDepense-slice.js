import { createSlice } from "@reduxjs/toolkit";

const suiviDepenseSlice = createSlice ({

    name: 'suiviDepense',
    initialState: {
       date: {
            year: Number(new Date().getFullYear()),
            month: Number(new Date().getMonth() + 1),
            day: Number(new Date().getDate()),
        },
        entreeCaisse: null,
        sortieCaisse: null,
        soldCaisse: 0,
        totalSoldCaisse: 0,
        readOnly: true,
        update: true,
        prevSoldCaisse: 0,
        totalSortieCaisse: 0,
        totalDette: 0,
    },

    reducers: {

        //change date fields
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

        //set read only to some inputs if data comes from the server
        setReadOnly (state, action) {

            state.readOnly = action.payload;
        },

        //set update if the data comes from the server and needs to be updated
        setUpdate(state, action ) {

            state.update = action.payload;
        },

        //set the soldCaisse
        setSoldCaisse ( state, action ) {

            state.soldCaisse = action.payload;
        },

        //set data to entree caisse
        setEntreeCaisse(state, action) {

            state.entreeCaisse = action.payload;
        },

        //set data to sortie caisse
        setSortieCaisse (state, action) {

            state.sortieCaisse = action.payload;
        },

        //handle data in Entree caisse
        HandleEntreeCaisse (state, action) {

            const name = action.payload.name;
            const value = action.payload.value;
            const index = action.payload.index;

        
            if (name === 'name') {

                state.entreeCaisse[index] = {...state.entreeCaisse[index], name: value };
            } else {

                state.entreeCaisse[index] = {...state.entreeCaisse[index], data: { amount: value} };
            };

        },

        //handle Data in Sortie caisse
        HandleSortieCaisse (state, action) {

            const name = action.payload.name;
            const value = action.payload.value;
            const mainIndex = action.payload.mainindex;
            const index = action.payload.index;

            if (name === "name") {

                state.sortieCaisse[mainIndex] = {...state.sortieCaisse[mainIndex], [name]: value};
            } else if (name === 'libel'){

                state.sortieCaisse[mainIndex].data[index] = {...state.sortieCaisse[mainIndex].data[index], [name]: value};
            } else {
                
                state.sortieCaisse[mainIndex].data[index] = {...state.sortieCaisse[mainIndex].data[index], [name]: value};
            };
        },

        //add a new data to entree caisse
        addProductEntreeCaisse (state, action) {

            state.entreeCaisse.push (
                {
                    id: state.entreeCaisse.length,
                    name: "",
                    data:{
                        amount: 0
                    }
                }
            );
        },

        //set the sortie caisse to the same length to have a good reading of data 
        setSameLength (state, action ) {

            for (let i = 0; i < state.sortieCaisse.length; i++) {

                if (state.sortieCaisse[i].data.length < action.payload) {

                    const emptyToPush = action.payload - state.sortieCaisse[i].data.length;
                    for (let j = 0; j < emptyToPush; j ++) {

                        state.sortieCaisse[i].data.push({libel: "", amount: "", index: state.sortieCaisse[i].data.length});
                    }
                }
            }
        },

        //add a function to a sortie caisse array
        addFonctionSortie (state){

            if (state.sortieCaisse.length > 0) {

                state.sortieCaisse.push({
                 index: state.sortieCaisse.length,
                 name: "",
                 data: state.sortieCaisse[0].data.map((el, index) => {return {index: index, libel: "", amount: ""}})
                });
            } else {
                
                state.sortieCaisse.push({
                 index: state.sortieCaisse.length,
                 name: "",
                 data: [{index: 0, libel: "", amount: ""}]
                });
            }
        },

        //add a justification to a sortie caisse array
        addLibelMontantSortie(state){

            for ( let i = 0; i < state.sortieCaisse.length; i++) {

                state.sortieCaisse[i].data.push ({
                    indexe: state.sortieCaisse[i].data.length,
                    libel: "",
                    amount: ""
                });
            };
        },

        setPrevSoldCaisse (state, action) {

            state.prevSoldCaisse = action.payload;
        },

        //set the total sold caisse in Entree caisse section 
        setTotalSoldCaisse (state, action) {

            state.totalSoldCaisse = action.payload;
        },

        handleSoldCaisseByUser (state, action) {

            if (action.payload === "") {

                state.prevSoldCaisse = 0;
            } else {
                state.prevSoldCaisse = action.payload;
            }
        },

        setTotalSortieCaisse (state, action) {

            state.totalSortieCaisse = action.payload;
        },

        setTotalDette (state, action) {
            state.totalDette = action.payload;
        }

    }
});

export const suiviDepenseActions = suiviDepenseSlice.actions;

export default suiviDepenseSlice;
