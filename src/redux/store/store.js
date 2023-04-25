import { configureStore } from "@reduxjs/toolkit";
import showData from "../slices/todoSlices"
import extraReducers from "../slices/weather/weatherSlices"
const store = configureStore({
    reducer: {
        show: showData,
        extraReducers,
    },
});
export default store;