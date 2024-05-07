import { createSlice } from '@reduxjs/toolkit'
import {loginUser} from "./authActions";

const initialState = {
    loading: false,
    user: {}, // for user object
    token: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutReducer: (state) => {
            state.user = {};
            state.error = null;
            state.token = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(loginUser.pending,(state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(loginUser.fulfilled,(state, {payload}) => {
            state.loading = false
            state.user = payload.user
            state.token = payload.token
            state.success = true
        })
        builder.addCase(loginUser.rejected,(state, {payload}) => {
            state.loading = false
            state.error = payload
            state.success = false
        })
    }
})
export const {
    logoutReducer
} = authSlice.actions;
export default authSlice.reducer;