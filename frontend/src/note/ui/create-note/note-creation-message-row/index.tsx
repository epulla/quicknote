import { Grid, Typography } from "@mui/material";

type NoteCreationMessageRowProps = {
  message: string;
};

const NoteCreationMessageRow = ({ message }: NoteCreationMessageRowProps) => {
  return (
    <Grid item>
      <Typography variant="h6">{message}</Typography>
    </Grid>
  );
};

export default NoteCreationMessageRow;
