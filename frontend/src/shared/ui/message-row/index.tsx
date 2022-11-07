import { Grid, Typography } from "@mui/material";

type NoteCreationMessageRowProps = {
  message: string;
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit";
  textAlign?: "left" | "center" | "right" | "justify";
};

const MessageRow = ({
  message,
  variant,
  textAlign = "left",
}: NoteCreationMessageRowProps) => {
  return (
    <Grid item textAlign={textAlign}>
      <Typography variant={variant}>{message}</Typography>
    </Grid>
  );
};

export default MessageRow;
