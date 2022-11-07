import React, { ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../commons/alert-message";
import { SubmitButton } from "../commons/submit-button";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  content: {
    fontSize: `15px`,
    color: `gray`,
    "&:hover": {
      cursor: "pointer",
    },
    textDecoration: "underline",
  },
}));

export interface ISignInInputProps {
  emailHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  passwordHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonHandler: () => void;
  isCorrect: boolean;
}

export const SignInInputGroup = ({
  emailHandler,
  passwordHandler,
  buttonHandler,
  isCorrect,
}: ISignInInputProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        name="email"
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
        onKeyPress={(e) => {
          if (e.key == "Enter") {
            buttonHandler();
          }
        }}
        onChange={passwordHandler}
      />
      <AlertMessage
        isOpen={isCorrect}
        text={"id 혹은 비밀번호를 잘못 입력하셨습니다"}
      />
      <Typography
        className={classes.content}
        onClick={() => {
          navigate({
            pathname: "/signup",
          });
        }}
      >
        {"signup"}
      </Typography>
      <SubmitButton handler={buttonHandler}>sign In</SubmitButton>
    </div>
  );
};
