import { SaveOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Button, Typography, TextField } from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";
import { useForm } from "../../hooks/useForm";
import { useMemo, useEffect } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startSavingNote } from "../../store/journal/thunks";

export const NoteView = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.journal);
  const { body, title, date, onInputChange, formState } = useForm(note);
  const dateToDisplay = useMemo(() => {
    const newDate = new Date(date).toUTCString();
    return newDate;
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState])

  const onSaveNote = () => {
      dispatch(startSavingNote());
  }
  
  return (
    <Grid
      className="animate__animated animate__fadeIn"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={30} fontWeight="light">
          { dateToDisplay}
        </Typography>
      </Grid>
      <Grid item>
        <Button  onClick={onSaveNote} color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container mt={2}>
        <TextField
          label="Title"
          placeholder="Title"
          fullWidth
          sx={{ mb: 2 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          placeholder="What happened to you today?"
          fullWidth
          multiline
          rows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
