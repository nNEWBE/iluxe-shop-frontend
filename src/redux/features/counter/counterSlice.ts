import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface CounterState {
    counters: { [productId: string]: number }; // Store count per product
}

const initialState: CounterState = {
    counters: {},
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            state.counters[productId] = (state.counters[productId] || 1) + 1;
        },
        decrement: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state.counters[productId] && state.counters[productId] > 1) {
                state.counters[productId] -= 1;
            }
        },
        setCounter: (state, action: PayloadAction<number>) => {
            const newValue = action.payload;
            Object.keys(state.counters).forEach((productId) => {
                state.counters[productId] = newValue;
            });
        },
    },
});

export const { increment, decrement, setCounter } = counterSlice.actions;
export const selectCounter = (state: RootState, productId: string) => state.counter.counters[productId] || 1;
export default counterSlice.reducer;
