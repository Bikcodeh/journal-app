import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearAndLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = createAsyncThunk('auth/checkingAuthentication', async (_, { dispatch }) => {
    dispatch(checkingCredentials())
})

export const startGoogleSignIn = createAsyncThunk('auth/startGoogleSignIn', async (_, { dispatch }) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(null));
    dispatch(login({
        uid: result.uid!,
        displayName: result.displayName!,
        email: result.email!,
        photoURL: result.photoURL!
    }));
})

interface UserEmailPasswordParams {
    email: string;
    password: string;
    displayName: string;
}

export const startCreatingUserWithEmailPassword = createAsyncThunk('auth/startCreatingUserWithEmailPassword', async ({ email, password, displayName }: UserEmailPasswordParams, { dispatch }) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
    if (!ok) return dispatch(logout(errorMessage));
    dispatch(login({
        uid: uid!!,
        displayName: displayName!!,
        email: email!!,
        photoURL: photoURL!!
    }))
})

interface CredentialParams {
    email: string;
    password: string;
}

export const startLoginWithEmailPassword = createAsyncThunk('auth/startLoginWithEmailPassword', async ({ email, password }: CredentialParams, { dispatch }) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, displayName, errorMessage } = await loginWithEmailPassword({ email, password });
    if (!ok) return dispatch(logout(errorMessage));
    dispatch(login({
        uid: uid!!,
        displayName: displayName!!,
        email: email!!,
        photoURL: photoURL!!
    }));
})

export const startLogout = createAsyncThunk('auth/startLogout', async (_, { dispatch }) => {
    await logoutFirebase();
    dispatch(clearAndLogout());
    dispatch(logout(null));
})