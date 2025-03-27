import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
    userId: string;
    role: string;
    iat: number;
    exp: number;
};

export type TDefaultUser = {
    email: string;
    password: string;
};

type TAuthState = {
    user: null | TUser;
    token: null | string;
    defaultUser?: null | TDefaultUser;
};

const initialState: TAuthState = {
    user: null,
    token: null,
    defaultUser: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.defaultUser = null;
        },
        setUserAfterRegister: (state, action) => {
            const { userInfo } = action.payload;
            state.defaultUser = userInfo;
        },
        removeRegisterUser: (state) => {
            state.defaultUser = null;
        }
    }
})

export const { setUser, logoutUser, setUserAfterRegister, removeRegisterUser } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectDefaultUser = (state: RootState) => state.auth.defaultUser;