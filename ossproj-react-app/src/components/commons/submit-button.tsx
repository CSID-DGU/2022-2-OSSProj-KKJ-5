import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#e5e5e5",
  },
}));

interface ISubmitHandlerButtonProps {
  handler: () => void;
  children: ReactNode;
}

export const SubmitButton = ({
  handler,
  children,
}: ISubmitHandlerButtonProps) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      className={classes.submit}
      onClick={handler}
    >
      {children}
    </Button>
  );
};
