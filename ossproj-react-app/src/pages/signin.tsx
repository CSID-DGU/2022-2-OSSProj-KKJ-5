import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// import { useSignIn } from '../hooks/use-signin';
import { SignInInputGroup } from "../components/signin/signin-input-group";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));

export const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  // const { signinHandler, isLoading, isSuccess, isError } = useSignIn({
  //   email,
  //   password,
  // });

  // useEffect(() => {
  //   if (isError) {
  //     setIsCorrect(true);
  //   }
  // }, [isError]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate("/select");
  //   }
  // }, [isSuccess]);

  return (
    <Grid container justifyContent={"center"} className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <SignInInputGroup
          emailHandler={handleEmail}
          passwordHandler={handlePassword}
          // buttonHandler={signinHandler}
          buttonHandler={() => {}}
          isCorrect={isCorrect}
        />
      </Grid>
    </Grid>
  );
};
