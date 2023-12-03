import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: {
            id: '123',
            title: '',
            body: '',
            date: '',
            images: []
        }
    },
    reducers: {
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {

        },
        setSaving: (state) => {
            state.isSaving = true;
        },
        updateNote: (state, action) => {

        },
        deleteNoteById: (state, action) => {

        }
    }
});


export const { 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById 
} = journalSlice.actions;