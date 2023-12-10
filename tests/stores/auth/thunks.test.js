import { signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn } from "../../../src/store/auth/thunks";
import { demoUser  } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Tests for AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks())
    test('should invoke checking credentials', async () => {
        await checkingAuthentication('dsda',  'sdsd')(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials({email: 'dsda', password: 'sdsd'}));
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
});