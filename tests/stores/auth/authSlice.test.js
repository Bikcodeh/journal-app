import { authSlice } from "../../../src/store/auth/authSlice"
import { initialState } from "../../fixtures/authFixtures";

describe('Tests for authSlice', () => { 
    test('should return the initial state', () => { 
        expect(authSlice.name).toBe('auth');
        expect(authSlice.getInitialState()).toEqual(initialState);
     })
 })