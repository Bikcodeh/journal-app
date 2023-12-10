import { checkingCredentials } from "../../../src/store/auth/authSlice";
import { checkingAuthentication } from "../../../src/store/auth/thunks";

jest.mock('../../../src/firebase/providers');

describe('Tests for AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks())
    test('should invoke checking credentials', async () => {
        await checkingAuthentication('dsda',  'sdsd')(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials({email: 'dsda', password: 'sdsd'}));
    });
});