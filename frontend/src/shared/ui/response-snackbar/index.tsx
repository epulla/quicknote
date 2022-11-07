import React, { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ApiResponse from "../../domain/api.response";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ResponseSnackbarProps = {
  response: ApiResponse<any> | undefined;
  openSnackbar: boolean;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  duration: number;
};

const ResponseSnackbar= ({
  response,
  openSnackbar,
  setOpenSnackbar,
  duration,
}: ResponseSnackbarProps) => {
  
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  if (!response) {
    return null;
  }

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={duration}
      onClose={handleClose}
    >
        <Alert onClose={handleClose} severity={response.status === 200 ? "success" : "error"} sx={{ width: "100%" }}>
          {response.message}
        </Alert>
    </Snackbar>
  );
};

export default ResponseSnackbar;
