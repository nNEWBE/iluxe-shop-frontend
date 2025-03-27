import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface DrawerState {
    open: boolean;
}

const initialState: DrawerState = {
    open: false,
};

export const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        openDrawer: (state) => {
            state.open = true;
        },
        closeDrawer: (state) => {
            state.open = false;
        },
        toggleDrawer: (state) => {
            state.open = !state.open;
        },
    },
});

export const { openDrawer, closeDrawer, toggleDrawer } = drawerSlice.actions;
export const selectDrawerState = (state: RootState) => state.drawer.open;

export default drawerSlice.reducer;
