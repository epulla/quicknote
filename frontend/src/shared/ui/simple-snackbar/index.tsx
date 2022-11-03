import React, { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { GetNoteInput } from "../../../note/domain/note.input";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type SimpleSnackbarProps = {
  response: GetNoteInput | undefined;
  openSnackbar: boolean;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  duration: number;
};

const SimpleSnackbar = ({
  response,
  openSnackbar,
  setOpenSnackbar,
  duration,
}: SimpleSnackbarProps) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      {response ? (
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your message has been created!
        </Alert>
      ) : (
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Oops! Something happened :(
        </Alert>
      )}
    </Snackbar>
  );
};

export default SimpleSnackbar;
