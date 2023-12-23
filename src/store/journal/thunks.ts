import { RootState } from './../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, collection, setDoc, deleteDoc, addDoc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { JournalState, Note, addNewEmptyNote, deleteNoteById, setActiveNote, setImagesToActiveNote, setNotes, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";
import { AuthState } from '../auth';

export const startAddNewNote = createAsyncThunk('journal/startAddNewNote', async (_, { dispatch }) => {

    const newNote: Note = {
        id: '',
        title: '',
        body: '',
        date: new Date().getTime(),
        imageUrls: []
    }
    dispatch(setActiveNote(newNote));
})

export const startLoadingNotes = createAsyncThunk('journal/startLoadingNotes', async (_, { dispatch, getState }) => {
    const { uid } = getState() as AuthState;
    if (!uid) throw new Error('UID DOEST NOT EXIST');
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
})

interface SavingNoteData {
    title: string;
    body: string;
}

export const startSavingNote = createAsyncThunk<void, SavingNoteData, { state: RootState }>('journal/startSavingNote', async ({ title, body }: SavingNoteData, { dispatch, getState }) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    console.log(note);
    const noteToUpdate: Note = { ...note!, title, body };
    if (noteToUpdate.id !== undefined && noteToUpdate.id !== null && noteToUpdate.id !== '') {
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteToUpdate.id}`);
        await setDoc(docRef, noteToUpdate, { merge: true });
        dispatch(updateNote({ noteToUpdate, message: 'Updated successfully!' }));
    } else {
        const docRef = await addDoc(collection(FirebaseDB, `${uid}/journal/notes`), noteToUpdate);
        const newNote: Note & { [x: string]: any } = { ...noteToUpdate, id: docRef.id };
        const docRefToUpdate = doc(FirebaseDB, `${uid}/journal/notes/${newNote.id}`);
        await updateDoc(docRefToUpdate, newNote)
        dispatch(addNewEmptyNote(newNote));
        dispatch(updateNote({ noteToUpdate: newNote, message: 'Created successfully' }));
    }

})

interface UploadFilesParams {
    files: FileList;
}

export const startUploadingFiles = createAsyncThunk('journal/startUploadingFiles', async ({ files }: UploadFilesParams, { dispatch }) => {
    dispatch(setSaving());
    const filesUploadPromises = [];
    for (const file of files) {
        filesUploadPromises.push(fileUpload(file))
    }
    const photosUrls = await Promise.all(filesUploadPromises);
    dispatch(setImagesToActiveNote(photosUrls));
})

export const startDeletingNote = createAsyncThunk<void, void, { state: RootState }>('journal/startDeletingNote', async (_, { dispatch, getState }) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    if (!note) return;
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);
    dispatch(deleteNoteById(note.id));
})