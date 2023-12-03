import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        isOpen: false
    },
    reducers: {
        setIsMenuOpen: (state, action ) => {
            state.isOpen = action.payload;
        },
    }
});


export const { setIsMenuOpen } = menuSlice.actions;