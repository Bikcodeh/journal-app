import { LoginPayloadData } from './../../../src/store/auth/authSlice';
import { AppDispatch, RootState } from './../../../src/store/store';
import { loginWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearAndLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";
import * as authSlice from '../../../src/store/auth/authSlice';

jest.mock('../../../src/firebase/providers');

describe('Tests for AuthThunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks())
    test('should invoke checking credentials', async () => {
        await checkingAuthentication()(dispatch, getState, '');
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startGoogleSignIn should call signInWithGoogle successfully', async () => {
        const dataLogin: LoginPayloadData = { ...demoUser }
        await (signInWithGoogle as jest.Mock).mockResolvedValue(dataLogin);

        await startGoogleSignIn()(dispatch, getState, '');

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith({ 
            "payload": undefined, 
            "type": "auth/checkingCredentials"
        });
        expect(dispatch).toHaveBeenCalledWith({
            "meta": {
                "arg": undefined,
                "requestId": expect.any(String),
                "requestStatus": "pending",
            },
            "type": "auth/startGoogleSignIn/pending"
        });
        expect(dispatch).toHaveBeenCalledWith({ 
            "payload": undefined, 
            "type": "auth/checkingCredentials"
        });
    });

    test('startGoogleSignIn should call signInWithGoogle error', async () => {
        const dataLogin = { ok: false, errorMessage: 'error login' }
        await (signInWithGoogle as jest.Mock).mockResolvedValue(dataLogin);

        await startGoogleSignIn()(dispatch, getState, '');

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(null));
    });

    test('startLoginWithEmailPassword should call login', async () => {
        const dataLogin = { email: 'email@gmail.com', password: '12345778h' }
        const loginResponse = { ok: true, ...demoUser }
        await (loginWithEmailPassword as jest.Mock).mockResolvedValue(loginResponse);
        await startLoginWithEmailPassword(dataLogin)(dispatch, getState, '')
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login({
            uid: demoUser.uid,
            displayName: demoUser.displayName,
            email: dataLogin.email,
            photoURL: demoUser.photoURL
        }));
    });

    test('startLoginWithEmailPassword should call logout when error', async () => {
        const dataLogin = { email: 'email@gmail.com', password: '12345778h' }
        const loginResponse = { ok: false, errorMessage: 'error' }
        await (loginWithEmailPassword as jest.Mock).mockResolvedValue(loginResponse);
        await startLoginWithEmailPassword(dataLogin)(dispatch, getState, '')

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginResponse.errorMessage));
    });

    test('startLogout should call clear and logout', async () => {
        await startLogout()(dispatch, getState, '')
        expect(dispatch).toHaveBeenCalledWith(clearAndLogout())
        expect(dispatch).toHaveBeenCalledWith(logout(null))
    });

    test('startCreatingUserWithEmailPassword should call login when success', async () => {
        const registerData = { email: 'example@gmail.com', password: '123123123', displayName: 'bikcode' }
        await (registerUserWithEmailPassword as jest.Mock).mockResolvedValue({ ok: true, uid: '123', photoURL: 'image', errorMessage: undefined })
        await startCreatingUserWithEmailPassword(registerData)(dispatch, getState, '')

        const loginData: LoginPayloadData = {
            uid: '123',
            displayName: registerData.displayName,
            email: registerData.email,
            photoURL: 'image'
        };
        expect(dispatch).toHaveBeenCalledWith({
            "meta": {
                "arg": registerData,
                "requestId": expect.any(String),
                "requestStatus": "pending",
            }, "payload": undefined, "type": "auth/startCreatingUserWithEmailPassword/pending"
        });
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startCreatingUserWithEmailPassword should call logout when error', async () => {
        const registerData = { email: 'example@gmail.com', password: '123123123', displayName: 'bikcode' }
        await (registerUserWithEmailPassword as jest.Mock).mockResolvedValue({ ok: false, errorMessage: 'error' })
        await startCreatingUserWithEmailPassword(registerData)(dispatch, getState, '')

        expect(dispatch).toHaveBeenCalledWith(logout('error'));
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });
});