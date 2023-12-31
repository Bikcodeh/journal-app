import { useMemo, useEffect, useRef, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutline,
  SaveOutlined,
  UploadFileOutlined,
} from "@mui/icons-material";
import { Grid, Button, Typography, TextField } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { ImageGallery } from "../components/ImageGallery";
import { useForm } from "../../hooks/useForm";
import {
  startDeletingNote,
  startSavingNote,
  startUploadingFiles,
} from "../../store/journal/thunks";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Note } from "../../store/journal";

export const NoteView = () => {

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const { active: note, messageSaved, isSaving } = useAppSelector(state => state.journal);

  if (!note) return;
  const {  body, date, id, imageUrls, title, onInputChange } = useForm<Note>(note)

  const dateToDisplay = useMemo(() => {
    const newDate = new Date(date).toUTCString();
    return newDate;
  }, [date]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Alert", messageSaved);
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSavingNote({ body, title }));
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files.length === 0) return;
    dispatch(startUploadingFiles({ files: e.target.files}));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

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
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          component="label"
          variant="contained"
          startIcon={<UploadFileOutlined />}
          sx={{ mr: 1 }}
        >
          UPLOAD FILES
        </Button>
        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          variant="contained"
          startIcon={<SaveOutlined />}
        >
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
      <Grid container justifyContent="end">
        <Button
          onClick={onDelete}
          sx={{ mt: 2 }}
          variant="contained"
          color="error"
        >
          DELETE NOTE
          <DeleteOutline />
        </Button>
      </Grid>
      <ImageGallery images={note?.imageUrls} />
    </Grid>
  );
};
