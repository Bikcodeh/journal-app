import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
       return {
        ok: false,
        errorMessage
       }
    }
}