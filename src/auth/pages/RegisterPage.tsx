import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { FormEvent, useState } from "react";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { FormValidations } from "../../interface";

const formData = {
  email: "exmaple@gmail.com",
  password: "1234",
  displayName: "Bikcode",
};

const formValidations: FormValidations = {
  email: [(value: string) => value.includes("@"), "Email must to have @"],
  password: [
    (value: string) => value.length >= 6,
    "Password must to have more than 6 characters",
  ],
  displayName: [(value: string) => value.length >= 1, "Name is required"],
};

export const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const [formSubmitted, setformSubmitted] = useState(false);
  const { status, errorMessage } = useAppSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  interface FormData {
    email: string;
    password: string;
    displayName: string;
    [x:string]: any;
  }

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
  } = useForm<FormData>(formData, formValidations);

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setformSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Create an account">
      <form onSubmit={onSubmitForm} className="animate__animated animate__fadeIn">
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
              error={!!displayNameValid && formSubmitted}
              helperText={
                !!displayNameValid && formSubmitted ? displayNameValid : ""
              }
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
              error={!!emailValid && formSubmitted}
              helperText={!!emailValid && formSubmitted ? emailValid : ""}
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
              error={!!passwordValid && formSubmitted}
              helperText={!!passwordValid && formSubmitted ? passwordValid : ""}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
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
