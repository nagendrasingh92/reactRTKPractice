import { createSlice } from "@reduxjs/toolkit";
import fetchWeatherAction from './weatherThunk';

const weatherSlice = createSlice({
    name: "weather",
    initialState: { },
    extraReducers: builder => {
        builder.addCase(fetchWeatherAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
            state.weather = action?.payload;
            state.loading = false;
            state.error = undefined;
        });

        builder.addCase(fetchWeatherAction.rejected, (state, action) => {
            state.loading = false;
            state.weather = undefined;
            state.error = action?.payload;
        });
    },
})

const {reducer} = weatherSlice
export default reducer;