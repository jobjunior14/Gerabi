import {createSlice } from "@reduxjs/toolkit"

const suiviDetteSlice = createSlice ({

    name: 'suiviDette',
    initialState: {
        agents: null,
        clients:null,
        musiciens: null,
        update: true,
        readOnly: true,
        totalDette: 0,
        detailTotDetteAgents: null,
        detailTotDetteMusiciens: null,
        detailTotDetteClients: null,
        fournisseurs: null,
        yourTotalDette: 0,
        detailTotDetteFournisseurs: null,
       
    },

    reducers: {

        //set read only to some inputs if data comes from the server
        setReadOnly (state, action) {

            state.readOnly = action.payload;
        },

        //set update if the data comes from the server and needs to be updated
        setUpdate(state, action ) {

            state.update = action.payload;
        },

        //set client data
        setClients (state, action ) {

            state.clients = action.payload;
        },
        //set client data
        setAgents (state, action ) {

            state.agents = action.payload;
        },
        //set client data
        setMusiciens (state, action ) {

            state.musiciens = action.payload;
        },
        //set client data
        setTotalDette(state, action ) {

            state.totalDette = action.payload;
        },

        //handle data in clients
        HandleClients (state, action) {

            const name = action.payload.name;
            const value = action.payload.value;
            const index = action.payload.index;

            if (name === 'name') {

                state.clients[index] = {...state.clients[index], name: value };
            } else {

                state.clients[index] = {...state.clients[index], data: {...state.clients[index]['data'], [name]: value} };
            }
        },
        //handle data in clients
        HandleAgents (state, action) {

            const name = action.payload.name;
            const value = action.payload.value;
            const index = action.payload.index;

            if (name === 'name') {

                state.agents[index] = {...state.agents[index], name: value };
            } else {

                state.agents[index] = {...state.agents[index], data: {...state.agents[index]['data'], [name]: value} };
            };
        },
        //handle data in clients
        HandleMusiciens (state, action) {

            const name = action.payload.name;
            const value = action.payload.value;
            const index = action.payload.index;

            if (name === 'name') {

                state.musiciens[index] = {...state.musiciens[index], name: value };
            } else {

                state.musiciens[index] = {...state.musiciens[index], data: {...state.musiciens[index]['data'], [name]: value} };
            };
        },
        //add a new data to entree caisse
        addCaseClients (state, action) {

            state.clients.push (
                {
                    index: state.clients.length,
                    name: "",
                    data:{
                        amount: 0,
                        payment: 0
                    }
                }
            );
        },
        //add a new data to entree caisse
        addCaseAgents (state, action) {

            state.agents.push (
                {
                    index: state.agents.length,
                    name: "",
                    data:{
                        amount: 0,
                        payment: 0
                    }
                }
            );
        },
        //add a new data to entree caisse
        addCaseMusiciens (state, action) {

            state.musiciens.push (
                {
                    index: state.musiciens.length,
                    name: "",
                    data:{
                        amount: 0,
                        payment: 0
                    }
                }
            );
        },

        //set the tatal dette  and payment (detail by nama)
        setDetailTotDetteAgents (state, action ){ 

            state.detailTotDetteAgents = action.payload;
        },

        //set the tatal dette and payment (detail by nama)
        setDetailTotDetteMusiciens (state, action ){ 
            state.detailTotDetteMusiciens = action.payload;
        },

        //set the tatal dette and payment (detail by nama)
        setDetailTotDetteClients (state, action ){ 
            state.detailTotDetteClients = action.payload;
        },

        //your Debts
         //set debt
        setFournisseurs (state, action ) {

            state.fournisseurs = action.payload;
        },
        //set client data
        setYourTotalDette(state, action ) {

            state.yourTotalDette = action.payload;
        },

        //handle data in clients
        HandleFournisseurs (state, action) {

            const name = action.payload.name;
            const value = action.payload.value;
            const index = action.payload.index;

            if (name === 'name') {

                state.fournisseurs[index] = {...state.fournisseurs[index], name: value };
            } else {

                state.fournisseurs[index] = {...state.fournisseurs[index], data: {...state.fournisseurs[index]['data'], [name]: value} };
            };
        },
        //add a new debt
        addCaseFournisseurs (state, action) {

            state.fournisseurs.push (
                {
                    index: state.fournisseurs.length,
                    name: "",
                    data:{
                        amount: 0,
                        payment: 0
                    }
                }
            );
        },

        //set the tatal dette and payment (detail by nama)
        setDetailTotDetteFournisseurs (state, action ){ 
            state.detailTotDetteFournisseurs = action.payload;
        },

    }
});

export const suiviDetteActions = suiviDetteSlice.actions;

export default suiviDetteSlice;