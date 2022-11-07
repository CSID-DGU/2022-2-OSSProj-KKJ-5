import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
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
      color="primary"
      className={classes.submit}
      onClick={handler}
    >
      {children}
    </Button>
  );
};
