import { doc, collection, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const startAddNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);
    }
}