import {combineReducers, configureStore} from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {setupListeners} from "@reduxjs/toolkit/query";
import {BaseApi} from "./baseApi";
import authReducer from './services/auth/authSlice'

const rootReducer = combineReducers({
    base: BaseApi.reducer,
    auth: authReducer
})

const persistConfig = {
    storage: AsyncStorage,
    key: 'root',
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middlewares = [
    BaseApi.middleware
];

const makeStore = () => configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: true,
        serializableCheck: {
            ignoreActions: {
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            }
        }
    }).concat(middlewares),
})
setupListeners(makeStore().dispatch);
export const store = makeStore();
export const perStore = persistStore(store);
export const dispatch = store.dispatch;