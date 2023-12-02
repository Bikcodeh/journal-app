import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";

const formData = {
  email: 'exmaple@gmail.com',
  password: '1234',
  displayName: 'Bikcode'
}

export const RegisterPage = () => {

  const {  email, password, displayName, onInputChange, formState} = useForm(formData);

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log(formState);
  }

  return (
    <AuthLayout title="Create an account">
      <form onSubmit={onSubmitForm}>
        <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Fullname"
              type="text"
              placeholder="John Doe"
              fullWidth
              value={displayName}
              onChange={onInputChange}
              name="displayName"
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="doe@gmail.com"
              fullWidth
              value={email}
              onChange={onInputChange}
              name="email"
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="*********"
              fullWidth
              value={password}
              onChange={onInputChange}
              name="password"
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button  type="submit" variant="contained" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1}}>¿Have already an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
