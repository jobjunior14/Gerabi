import {createSlice } from "@reduxjs/toolkit"

const suiviDette = createSlice ({

    name: 'suiviDette',
    initialState: {
        date: {
            year: Number(new Date().getFullYear()),
            month: Number(new Date().getMonth() + 1),
            day: Number(new Date().getDate()),
        },
        agents: null,
        clients:null,
        musiciens: null,
        update: true,
        readOnly: true,
        totalDette: 0
    }
})