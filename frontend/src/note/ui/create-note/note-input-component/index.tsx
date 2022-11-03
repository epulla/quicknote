import { Grid, TextareaAutosize, Typography, useTheme } from "@mui/material";

type NoteInputComponentProps = {
  handleNoteContentChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

const NoteInputComponent = ({
  handleNoteContentChange,
}: NoteInputComponentProps) => {
  const theme = useTheme();
  return (
    <Grid item container direction="column" component="form">
      <Typography variant="h5">note</Typography>
      <TextareaAutosize
        minRows={7}
        placeholder="Type some secrets..."
        onChange={handleNoteContentChange}
        style={{
          fontSize: "1.5rem",
          backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
          color: theme.palette.mode === "dark" ? "#fff" : "#121212",
        }}
      />
    </Grid>
  );
};

export default NoteInputComponent;
