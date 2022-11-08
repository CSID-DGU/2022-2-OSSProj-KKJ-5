import React, { ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@mui/material";
import { SubmitButton } from "../commons/submit-button";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export interface ISignUpInputProps {
  emailHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  passwordHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  usernameHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonHandler: () => void;
  emailValid: boolean;
  emailErrorMessage: string;
}

export const SignUpInputGroup = ({
  emailHandler,
  passwordHandler,
  usernameHandler,
  buttonHandler,
  emailValid,
  emailErrorMessage,
}: ISignUpInputProps) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        error={!emailValid}
        id="email"
        name="email"
        helperText={emailErrorMessage}
        label="Email Address"
        onChange={emailHandler}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        onChange={passwordHandler}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        name="username"
        label="username"
        onChange={usernameHandler}
        onKeyPress={(e) => {
          if (e.key == "Enter") {
            buttonHandler();
          }
        }}
      />

      <SubmitButton handler={buttonHandler}>sign Up</SubmitButton>
    </div>
  );
};
