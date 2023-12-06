import { doc, collection, setDoc, deleteDoc, addDoc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, setActiveNote, setImagesToActiveNote, setNotes, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startAddNewNote = () => {
    return async (dispatch) => {
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('UID DOEST NOT EXIST');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSavingNote = ({title, body }) => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFirestore = { ...note, title, body };

        if (noteToFirestore.id !== undefined && noteToFirestore.id !== null) {
            const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteToFirestore.id}`);
            await setDoc(docRef, noteToFirestore, { merge: true });
            dispatch(updateNote(noteToFirestore));
        } else {
            const docRef = await addDoc(collection(FirebaseDB, `${uid}/journal/notes`), noteToFirestore);
            const newNote = { ...noteToFirestore, id: docRef.id };
            const docRefToUpdate = doc(FirebaseDB, `${uid}/journal/notes/${newNote.id}`);
            await updateDoc(docRefToUpdate, newNote)
            dispatch(addNewEmptyNote(newNote));
            dispatch(updateNote(newNote));
        }
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());
        const filesUploadPromises = [];
        for (const file of files) {
            filesUploadPromises.push(fileUpload(file))
        }
        const photosUrls = await Promise.all(filesUploadPromises);
        dispatch(setImagesToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id));
    }
}