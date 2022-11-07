import {
  Grid,
  Paper,
  TextareaAutosize,
  Typography,
  useTheme,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ApiResponse from "../../../../shared/domain/api.response";
import MessageRow from "../../../../shared/ui/message-row";
import Note from "../../../domain/note";

type ResponseRowProps = {
  response: ApiResponse<Note | undefined> | undefined;
};

const ResponseRow = ({ response }: ResponseRowProps) => {
  const theme = useTheme();

  if (!response) {
    return null;
  }

  return (
    <Grid item container direction="column">
      {response.entity ? (
        <>
          <Typography variant="h5">decrypted note</Typography>
          <TextareaAutosize
            readOnly
            minRows={7}
            placeholder="..."
            value={
              response.entity.content !== ""
                ? response.entity.content
                : "****Sorry, this note was already deleted****"
            }
            style={{
              fontSize: "1.5rem",
              backgroundColor:
                theme.palette.mode === "dark" ? "#121212" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "#121212",
            }}
          />
          <MessageRow
            variant="h6"
            message={`You have ${
              response.entity.maxViews - response.entity.currentView
            } more time(s) to view this note`}
          />
        </>
      ) : (
        <>
          <Grid item textAlign="center" py={5}>
            <ErrorOutlineIcon style={{ fontSize: "5em" }} />
          </Grid>
          <MessageRow
            textAlign="center"
            variant="h5"
            message="Oh no :( no note was found. Are you sure you copy the correct link?"
          />
        </>
      )}
    </Grid>
  );
};

export default ResponseRow;
