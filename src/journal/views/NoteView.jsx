import { SaveOutlined } from "@mui/icons-material";
import { Grid, Button, Typography, TextField } from "@mui/material";
import { ImageGallery } from '../components/ImageGallery';

export const NoteView = () => {
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
            <Typography fontSize={30} fontWeight='light'>28 agust, 2023</Typography>
        </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField 
            label="Title"
            placeholder="Title"
            fullWidth
            sx={{ mb: 2}}
        />
        <TextField 
            placeholder="What happened to you today?"
            fullWidth
            multiline
            rows={5}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
