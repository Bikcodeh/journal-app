import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: true,
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
        addNewEmptyNote: (state, action ) => {
    
        },
        setActiveNote: (state, action) => {

        },
        setNotes: (state, action) => {

        },
        setSaving: (state) => {

        },
        updateNote: (state, action) => {

        },
        deleteNoteById: (state, action) => {

        }
    }
});


export const { increment } = journalSlice.actions;