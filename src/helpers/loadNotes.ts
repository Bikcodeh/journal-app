import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { Note } from './../store/journal/journalSlice';

export const loadNotes = async (uid: string = '') => {
    if (!uid) throw new Error('UID DOES NOT EXIST');

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    const notes: Note[] = [];
    docs.forEach(doc => {
        notes.push({
            id: doc.id,
            imageUrls: doc.data().imageUrls,
            title: doc.data().title,
            body: doc.data().body,
            date: doc.data().date
        })
    })
    return notes;
}