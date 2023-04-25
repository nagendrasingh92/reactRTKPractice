import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchWeatherAction = createAsyncThunk(
    "weather/fetch",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        console.log('payload', payload);
        try {
            const { data } = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=70796e6346b6279389b2c9bb362df985&units=metric`
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

export default fetchWeatherAction