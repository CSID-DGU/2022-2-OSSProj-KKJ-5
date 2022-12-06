import React, { useState, ChangeEvent, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { SignUpInputGroup } from "../components/signup/signup-input-group";
import { useNavigate } from "react-router-dom";
import { checkEmailValid } from "../hooks/check-email-valid";
import { useSignup } from "../hooks/use-signup";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));

export const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailValid(checkEmailValid(email));
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleUsername = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const { signupHandler, isLoading, isSuccess } = useSignup({
    email: email,
    password: password,
    name: name,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/signin");
    }
  }, [isSuccess]);

  // if (isLoading) {
  //   return <div>Loading to signup ...</div>;
  // }

  const handleClose = () => {
    navigate({ pathname: "/signin" });
  };

  return (
    <Grid container justifyContent={"center"} className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <SignUpInputGroup
          emailHandler={handleEmail}
          passwordHandler={handlePassword}
          usernameHandler={handleUsername}
          buttonHandler={signupHandler}
          emailValid={emailValid}
          emailErrorMessage={emailValid ? "" : "Not a valid email address"}
        />
      </Grid>
    </Grid>
  );
};
