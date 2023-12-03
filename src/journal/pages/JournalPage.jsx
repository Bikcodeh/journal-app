import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView } from "../views/NothingSelectedView";
import { NoteView } from "../views/NoteView";
import { AddOutlined } from "@mui/icons-material";
import { startAddNewNote } from "../../store/journal/thunks";

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector((state) => state.journal);

  const onAddNewNote = () => {
    dispatch(startAddNewNote());
  };
  return (
    <JournalLayout>
      {!!active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        disabled={isSaving}
        onClick={onAddNewNote}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.8 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
