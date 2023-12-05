import { useMemo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SaveOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Grid, Button, Typography, TextField, IconButton } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { ImageGallery } from "../components/ImageGallery";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startSavingNote, startUploadingFiles } from "../../store/journal/thunks";

export const NoteView = () => {

  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);
  const { body, title, date, onInputChange, formState } = useForm(note);
  const dateToDisplay = useMemo(() => {
    const newDate = new Date(date).toUTCString();
    return newDate;
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Note updated', messageSaved);
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  const onFileInputChange = ({target}) => {
      if (target.files === 0) return;
      console.log('saving')
      dispatch(startUploadingFiles(target.files));
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
          {dateToDisplay}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none'}}
          ref={fileInputRef}
           />
        <IconButton onClick={() => fileInputRef.current.click()}>
          <UploadFileOutlined />
        </IconButton>
        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{ padding: 2 }}
        >
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
      <ImageGallery images={note.imageUrls}/>
    </Grid>
  );
};
