import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',
        uid: null,
        email: null,
        displayName: null,
        photoUrl: null,
        errorMessage: null
    },
    reducers: {
        login: (state, action) => {
            
        },
        logout: (state, action) => {
            
        },
        checkingCredentials: (state, action) => {
            console.log(action.payload);
            state.status = 'Checking';
        },
    }
});


export const { login, logout, checkingCredentials } = authSlice.actions;