import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface FilterState {
    params: Record<string, string>; // Holds multiple key-value pairs
    isReset: boolean;
}

const initialState: FilterState = {
    params: {},
    isReset: false
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setParams: (state, action: PayloadAction<{ key: string; value: string }[]>) => {
            action.payload.forEach(({ key, value }) => {
                state.params[key] = value; // Properly stores multiple key-value pairs
            });
            state.isReset = false;
        },

        removeParam: (state, action: PayloadAction<string>) => {
            const newParams = { ...state.params };
            delete newParams[action.payload]; // Remove the key
            state.params = newParams;
        },

        clearParams: (state) => {
            state.params = {}; // Clears all key-value pairs
            state.isReset = true;
        },
    },
});

export const { setParams, removeParam, clearParams } = filterSlice.actions;
export const selectParams = (state: RootState) => state.filter.params;
export const selectIsReset = (state: RootState) => state.filter.isReset;
export default filterSlice.reducer;
