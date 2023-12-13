import { loadNotes } from "../../../src/helpers/loadNotes";
import { noteFake  } from "../../fixtures/authFixtures";
import { startAddNewNote, startLoadingNotes, startSavingNote } from "../../../src/store/journal/thunks";
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";

jest.mock('../../../src/helpers/loadNotes')
describe('Tests for Journal Thunks', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks())

    test('startAddNewNote should call setActiveNote when user wants to add a new note', async () => {
        await startAddNewNote()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(
            { "payload": { 
                "body": "", 
                "date": expect.any(Number), 
                "imageUrls": [], 
                "title": "" }, 
                "type": "journal/setActiveNote" 
            }
        );
    });

    test('startLoadingNotes should throw error when uid doest not exist', async () => { 
        const UID_TEST = 'uid_Test'
        getState.mockReturnValue({auth: {uid: undefined}})
        try {
            await startLoadingNotes()(dispatch, getState)
        } catch (error) {
            expect(error.message).toEqual('UID DOEST NOT EXIST')
        }
     });

     test('startLoadingNotes should load notes and set notes', async () => { 
        const UID_TEST = 'uid_Test'
        const note = {id: '123', ...noteFake}
        getState.mockReturnValue({auth: {uid: UID_TEST}})
        await loadNotes.mockResolvedValue([note]);
        await startLoadingNotes()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(
            {
                payload: [note],
                "type": "journal/setNotes"
            }
        );
     });

     test('startSavingNote should save in firestore and call update note when it is creating', async () => {
        const UID_TEST = 'uid_Test'
            getState.mockReturnValue({auth: { uid: UID_TEST}, journal: { active: { ...noteFake } }})
            await startSavingNote({
                title: 'test',
                body: 'body test'
            })(dispatch, getState)

            const collectionRef = collection(FirebaseDB, `${UID_TEST}/journal/notes`);
            const docs = await getDocs(collectionRef);

            const deletePromises = [];
            docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));
            await Promise.all(deletePromises);
      });
});