import { LoginPayloadData } from './../store/auth/authSlice';
import { useAppSelector, useAppDispatch } from './hooks';
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {

    useAppSelector(state => state.auth)

    const { status } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout(null));
            const { uid, displayName, photoURL, email } = user;

            const userData: LoginPayloadData = { 
                uid, 
                displayName: displayName!, 
                photoURL: photoURL!, 
                email: email!
            }
            dispatch(login(userData));
            dispatch(startLoadingNotes());
        });
    }, []);
    return status;
}

