import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 };


export const todoSlices = createSlice({
    name: "showData",
    initialState,
    reducers: {
        addData: () => {

        },
        showData: (state, action) => {
            state.value = state.value;
        }
    },
})

export const { addData, showData } = todoSlices.actions;

export default todoSlices.reducer;