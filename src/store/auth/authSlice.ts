import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
    status: string;
    uid: string | null;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    errorMessage: string | null;
}

export type LoginPayloadData = {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    } as AuthState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayloadData>) => {
            state.status = 'authenticated',
            state.uid = action.payload.uid,
            state.displayName = action.payload.displayName,
            state.email = action.payload.email,
            state.photoURL = action.payload.photoURL,
            state.errorMessage = null
        },
        logout: (state, action: PayloadAction<string | null>) => {
            state.status = 'not-authenticated',
            state.uid = null,
            state.displayName = null,
            state.email = null,
            state.photoURL = null,
            state.errorMessage = action.payload
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
    }
});


export const { login, logout, checkingCredentials } = authSlice.actions;