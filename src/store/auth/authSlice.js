import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        uid: null,
        email: null,
        displayName: null,
        photoUrl: null,
        errorMessage: null
    },
    reducers: {
        login: (state, action) => {
            state.status = 'authenticated',
            state.uid = action.payload.uid,
            state.displayName = action.payload.displayName,
            state.email = action.payload.email,
            state.photoUrl = action.payload.photoURL,
            state.errorMessage = null
        },
        logout: (state, action) => {
            state.status = 'not-authenticated',
            state.uid = null,
            state.displayName = null,
            state.email = null,
            state.photoUrl = null,
            state.errorMessage = action.payload?.errorMessage
        },
        checkingCredentials: (state) => {
            state.status = 'Checking';
        },
    }
});


export const { login, logout, checkingCredentials } = authSlice.actions;