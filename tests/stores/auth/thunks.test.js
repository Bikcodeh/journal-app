import { loginWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearAndLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Tests for AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks())
    test('should invoke checking credentials', async () => {
        await checkingAuthentication('dsda', 'sdsd')(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials({ email: 'dsda', password: 'sdsd' }));
    });

    test('startGoogleSignIn should call signInWithGoogle successfully', async () => {
        const dataLogin = { ok: true, ...demoUser }
        await signInWithGoogle.mockResolvedValue(dataLogin);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(dataLogin));
    });

    test('startGoogleSignIn should call signInWithGoogle error', async () => {
        const dataLogin = { ok: false, errorMessage: 'error login' }
        await signInWithGoogle.mockResolvedValue(dataLogin);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });

    test('startLoginWithEmailPassword should call login', async () => {
        const dataLogin = { email: 'email@gmail.com', password: '12345778h' }
        const loginResponse = { ok: true, ...demoUser }
        await loginWithEmailPassword.mockResolvedValue(loginResponse);
        await startLoginWithEmailPassword(dataLogin)(dispatch)
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
        await loginWithEmailPassword.mockResolvedValue(loginResponse);
        await startLoginWithEmailPassword(dataLogin)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginResponse.errorMessage }));
    });

    test('startLogout should call clear and logout', async () => {
        await startLogout()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(clearAndLogout())
        expect(dispatch).toHaveBeenCalledWith(logout())
    });

    test('startCreatingUserWithEmailPassword should call login when success', async () => {
        const registerData = { email: 'example@gmail.com', password: '123123123', displayName: 'bikcode' }
        await registerUserWithEmailPassword.mockResolvedValue({ ok: true, uid: '123', photoURL: 'image', errorMessage: undefined })
        await startCreatingUserWithEmailPassword(registerData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(login({
            uid: '123',
            displayName: registerData.displayName,
            email: registerData.email,
            photoURL: 'image'

        }));
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startCreatingUserWithEmailPassword should call logout when error', async () => {
        const registerData = { email: 'example@gmail.com', password: '123123123', displayName: 'bikcode' }
        await registerUserWithEmailPassword.mockResolvedValue({ ok: false, errorMessage: 'error' })
        await startCreatingUserWithEmailPassword(registerData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: 'error'}));
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });
});