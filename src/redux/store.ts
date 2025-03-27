import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { productSlice } from "./features/product/productSlice";
import { authSlice } from "./features/auth/authSlice";
import { cartSlice } from "./features/cart/cartSlice";
import { counterSlice } from "./features/counter/counterSlice";
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { drawerSlice } from "./features/drawer/drawerSlice";
import { filterSlice } from "./features/filter/filterSlice";

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    product: productSlice.reducer,
    drawer:drawerSlice.reducer,
    counter:counterSlice.reducer,
    filter: filterSlice.reducer
});

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ["auth", "cart"],
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(baseApi.middleware);
    },
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export const persistor = persistStore(store);