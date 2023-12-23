import { AuthState } from './../../../src/store/auth/authSlice';
import { RootState } from './../../../src/store/store';
import { loadNotes } from "../../../src/helpers/loadNotes";
import { noteFake } from "../../fixtures/authFixtures";
import { UploadFilesParams, startAddNewNote, startDeletingNote, startLoadingNotes, startSavingNote, startUploadingFiles } from "../../../src/store/journal/thunks";
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { setSaving } from "../../../src/store/journal/journalSlice";

jest.mock('../../../src/helpers/loadNotes')

describe('Tests for Journal Thunks', () => {
    const dispatch = jest.fn();
    const getState = jest.fn<AuthState, []>();


    function createMockFileList(files: File[]): FileList {
        return {
            length: files.length,
            item(index: number): File | null {
                return index < files.length ? files[index] : null;
            },
            [Symbol.iterator]: function* () {
                let index = 0;
                while (index < files.length) {
                    yield files[index++];
                }
            },
        } as FileList;
    }

    beforeEach(() => jest.clearAllMocks())

    test('startAddNewNote should call setActiveNote when user wants to add a new note', async () => {
        await startAddNewNote()(dispatch, getState, '')
        expect(dispatch).toHaveBeenCalledWith({ "meta": { "arg": undefined, "requestId": expect.any(String), "requestStatus": "pending" }, "payload": undefined, "type": "journal/startAddNewNote/pending" })
    });

    test('startLoadingNotes should throw error when uid doest not exist', async () => {
        const UID_TEST = 'uid_Test'
        getState.mockReturnValue({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: null

        })
        try {
            await startLoadingNotes()(dispatch, getState, '')
        } catch (error) {
            expect(error.message).toEqual('UID DOEST NOT EXIST')
        }
    });

    test('startLoadingNotes should load notes and set notes', async () => {
        const UID_TEST = 'uid_Test'
        const note = { ...noteFake, id: '123' }
        getState.mockReturnValue({
            status: 'authenticated',
            uid: UID_TEST,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: null
        })
        await (loadNotes as jest.Mock).mockResolvedValue([note]);
        await startLoadingNotes()(dispatch, getState, '');
        expect(dispatch).toHaveBeenCalledWith({ "meta": { "arg": undefined, "requestId": expect.any(String), "requestStatus": "pending" }, "payload": undefined, "type": "journal/startLoadingNotes/pending" });
        expect(dispatch).toHaveBeenCalledTimes(3)
    });

    test('startSavingNote should save in firestore and call update note when it is creating', async () => {
        const UID_TEST = 'uid_Test'
        const rootGetState = jest.fn<RootState, []>();
        rootGetState.mockReturnValue({
            auth: {
                status: 'authenticated',
                uid: UID_TEST,
                email: null,
                displayName: null,
                photoURL: null,
                errorMessage: null
            },
            journal: {
                isSaving: false,
                messageSaved: '',
                notes: [],
                active: { ...noteFake }
            }, menu: {
                isOpen: false
            }
        })
        await startSavingNote({
            title: 'test',
            body: 'body test'
        })(dispatch, rootGetState, '')

        const collectionRef = collection(FirebaseDB, `${UID_TEST}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises: Promise<void>[] = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));
        await Promise.all(deletePromises);
    });

    test('startDeletingNote should call deleteNoteById', async () => {
        const UID_TEST = 'uid_Test'
        const rootGetState = jest.fn<RootState, []>();
        rootGetState.mockReturnValue({
            auth: {
                status: 'authenticated',
                uid: UID_TEST,
                email: null,
                displayName: null,
                photoURL: null,
                errorMessage: null
            },
            journal: {
                isSaving: false,
                messageSaved: '',
                notes: [],
                active: { ...noteFake }
            }, menu: {
                isOpen: false
            }
        })

        await startDeletingNote()(dispatch, rootGetState, '');
        expect(dispatch).toHaveBeenCalledWith({
            "meta": {
                "arg": undefined,
                "requestId": expect.any(String),
                "requestStatus": "pending",
            },
            "payload": undefined,
            "type": "journal/startDeletingNote/pending"
        });
        expect(dispatch).toHaveBeenCalledWith({
            "meta": {
                "arg": undefined,
                "requestId": expect.any(String),
                "requestStatus": "fulfilled",
            },
            "payload": undefined,
            "type": 'journal/startDeletingNote/fulfilled',
        });
    });

    test('startUploadingFiles should call setImagesToActiveNote', async () => {

        const file1 = new File(['contenido1'], 'archivo1.txt', { type: 'text/plain' });
        const file2 = new File(['contenido2'], 'archivo2.txt', { type: 'text/plain' });
      

        const fileList = createMockFileList([file1, file2]);
        const filesToUpload: UploadFilesParams = {
            files: fileList
        };
        await startUploadingFiles(filesToUpload)(dispatch, getState, '');
        expect(dispatch).toHaveBeenCalledWith(setSaving());
        expect(dispatch).toHaveBeenCalledWith({
            "meta": {
                "arg": expect.any(Object),
                "requestId": expect.any(String),
                "requestStatus": "pending",
            },
            "payload": undefined,
            "type": "journal/startUploadingFiles/pending"
        })
        expect(dispatch).toHaveBeenCalledWith({
            "payload": undefined,
            "type": "journal/setSaving"
        })
        expect(dispatch).toHaveBeenCalledWith({
            "payload": expect.any(Array<String>),
            "type": "journal/setImagesToActiveNote"
        })
    });
});