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
        prevSoldCaisse: null,
        tableRow: 0
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

        setEntreeCaisse(state, action) {

            state.entreeCaisse = action.payload;
        },

        setSortieCaisse (state, action) {

            state.sortieCaisse = action.payload;
        },


        HandleEntreeCaisse (state, action) {

            const name = action.payload.name;
            const value = action.payload.value;
            const data = state.entreeCaisse;
            const index = action.payload.index;

        
            if (name === 'name') {

                state.entreeCaisse[index] = {...state.entreeCaisse[index], name: value };
            } else {

                state.entreeCaisse[index] = {...state.entreeCaisse[index], data: {...state.entreeCaisse[index]['data'], [name]: value} };
            };


            state.entreeCaisse = data;
        },

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

        addFonctionSortie (state){

           state.sortieCaisse.push({
            index: state.sortieCaisse.length,
            name: "",
            data: state.sortieCaisse[0].data.map((el, index) => {return {index: index, libel: "", amount: ""}})
           });
        },

        addLibelMontantSortie(state){

            for ( let i = 0; i < state.sortieCaisse.length; i++) {

                state.sortieCaisse[i].data.push ({
                    indexe: state.sortieCaisse[i].data.length,
                    libel: "",
                    amount: ""
                });
            };
        }

    }
});

export const suiviDepenseActions = suiviDepenseSlice.actions;

export default suiviDepenseSlice;
