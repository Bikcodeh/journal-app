import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Tests for authSlice', () => {
    test('should return the initial state', () => {
        expect(authSlice.name).toBe('auth');
        expect(authSlice.getInitialState()).toEqual(initialState);
    })

    test('should set state when loggin', () => {
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual(
            {
                status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
                uid: demoUser.uid,
                email: demoUser.email,
                displayName: demoUser.displayName,
                photoURL: demoUser.photoURL,
                errorMessage: null
            }
        );
    });

    test('should set state when logout without message', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual(
            {
                status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
                uid: null,
                email: null,
                displayName: null,
                photoURL: null,
                errorMessage: undefined,
            }
        );
    });

    test('should set state when logout with message', () => {
        const message= 'Error in logout'
        const state = authSlice.reducer(authenticatedState, logout({errorMessage: message}));
        expect(state).toEqual(
            {
                status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
                uid: null,
                email: null,
                displayName: null,
                photoURL: null,
                errorMessage: message,
            }
        );
    });

    test('should set checkint state', () => { 
        const state = authSlice.reducer(initialState, checkingCredentials());
        expect(state).toEqual({
            status: 'checking',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: null
        })
     });
})