import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //To check all the data related to authentication
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, photoURL, uid, email } = result.user;
        return {
            ok: true,
            displayName, photoURL, uid, email
        }
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}

export interface RegisterArgs {
    email: string;
    password: string;
    displayName: string;
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }: RegisterArgs) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        const user = FirebaseAuth.currentUser;
        if (!user) return { ok: false, errorMessage: "User not found" };;
        await updateProfile(user, { displayName });
        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName
        };
    } catch (error: any) {
        return { ok: false, errorMessage: error.message }
    }
}

interface LoginArgs {
    email: string;
    password: string;
}

export const loginWithEmailPassword = async ({ email, password }: LoginArgs) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { photoURL, displayName, uid } = resp.user;
        return {
            ok: true,
            uid,
            photoURL,
            displayName
        }
    } catch (error: any) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async () => {
    await FirebaseAuth.signOut();
}