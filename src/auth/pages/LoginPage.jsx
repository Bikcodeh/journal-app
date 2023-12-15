import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";

const formData = {
  email: "",
  password: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "Email must to have @"],
  password: [
    (value) => value.length >= 6,
    "Password must to have more than 6 characters",
  ],
};

export const LoginPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  useEffect(() => {}, [status]);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const {
    email,
    emailValid,
    password,
    passwordValid,
    onInputChange,
    isFormValid,
  } = useForm(formData, formValidations);

  const onSubmitForm = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const signInWithGoogle = () => {
    console.log('pressed');
    dispatch(startGoogleSignIn());
  };
  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmitForm} className="animate__animated animate__fadeIn" aria-label="form-login">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              data-testid="email"
              label="Email"
              type="email"
              placeholder="doe@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={!!emailValid && formSubmitted ? emailValid : ""}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              data-testid="password"
              label="Password"
              type="password"
              placeholder="*********"
              fullWidth
              value={password}
              name="password"
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={!!passwordValid && formSubmitted ? passwordValid : ""}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                onClick={onSubmitForm}
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                aria-label="google-btn"
                disabled={isAuthenticating}
                onClick={signInWithGoogle}
                variant="contained"
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Register
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
