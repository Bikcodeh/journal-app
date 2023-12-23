import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
    body: string;
    date: number;
    id: string;
    imageUrls: string[];
    title: string;
    [x: string]: any;
}

export interface JournalState {
    isSaving: boolean;
    messageSaved: string;
    notes: Note[];
    active: Note | null;
}

const journalInitialState: JournalState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
}

interface UpdateNotePayload {
    message: string;
    noteToUpdate: Note;
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState: journalInitialState,
    reducers: {
        addNewEmptyNote: (state, action: PayloadAction<Note>) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action: PayloadAction<Note>) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action: PayloadAction<Note[]>) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action: PayloadAction<UpdateNotePayload>) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.noteToUpdate.id) {
                    return action.payload.noteToUpdate;
                }
                return note;
            });
            state.messageSaved = `${action.payload.noteToUpdate.title}, ${action.payload.message}`;
            state.active = action.payload.noteToUpdate;
        },
        setImagesToActiveNote: (state, action: PayloadAction<string[]>) => {
            state.active = state.active
                ? { ...state.active, imageUrls: [...(state.active?.imageUrls ?? []), ...action.payload] }
                : null;
            state.isSaving = false;
        },
        clearAndLogout: (state) => {
            state.active = null;
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
        },
        deleteNoteById: (state, action: PayloadAction<string>) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id != action.payload);
        }
    }
});


export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    setImagesToActiveNote,
    clearAndLogout
} = journalSlice.actions;