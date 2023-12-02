import { Link as RouterLink } from "react-router-dom";
import { useDispatch  } from "react-redux";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  email: "exmaple@gmail.com",
  password: "1234",
  displayName: "Bikcode",
};

const formValidations = {
  email: [(value) => value.includes("@"), "Email must to have @"],
  password: [
    (value) => value.length >= 6,
    "Password must to have more than 6 characters",
  ],
  displayName: [(value) => value.length >= 1, "Name is required"],
};

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setformSubmitted] = useState(false);

  const {
    email,
    password,
    displayName,
    onInputChange,
    formState,
    emailValid,
    passwordValid,
    displayNameValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const onSubmitForm = (event) => {
    event.preventDefault();
    setformSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };


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
              error={ !!displayNameValid && formSubmitted}
              helperText={ !!displayNameValid && formSubmitted ? displayNameValid : ''}
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
              error={ !!emailValid && formSubmitted}
              helperText={ !!emailValid && formSubmitted ? emailValid : '' }
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
              error={ !!passwordValid && formSubmitted}
              helperText={!!passwordValid && formSubmitted ? passwordValid : ''}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Have already an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
