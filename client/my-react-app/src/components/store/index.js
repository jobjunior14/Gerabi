import {configureStore } from '@reduxjs/toolkit';
import productSlice from './AllProductManager-slice';

const store = configureStore ( {

    reducer: {

        product: productSlice.reducer
    }
});

export default store;
