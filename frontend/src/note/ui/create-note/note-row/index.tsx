import { Grid, Switch, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from "@mui/material/styles";

type NoteRowProps = {
  loading: boolean;
  isAdvancedOptionChecked: boolean;
  handleAdvancedOptionSwitch: () => void;
  handleNoteCreation: () => void;
  children: any;
};

const NoteRow = ({
  loading,
  isAdvancedOptionChecked,
  handleAdvancedOptionSwitch,
  handleNoteCreation,
  children,
}: NoteRowProps) => {
  const theme = useTheme();
  const OptionsRow = () => (
    <Grid item container direction="column" py={2}>
      <Grid item xs={8}>
        <Grid container direction="row" alignItems="center">
          <Switch
            color={theme.palette.mode === "dark" ? "default" : "primary"}
            checked={isAdvancedOptionChecked}
            onChange={handleAdvancedOptionSwitch}
          ></Switch>
          <Typography>Advanced</Typography>
        </Grid>
      </Grid>
      <Grid item xs={8} textAlign="end">
        <LoadingButton
          variant={theme.palette.mode === "dark" ? "outlined" : "contained"}
          color="primary"
          loading={loading}
          loadingIndicator="Creating..."
          onClick={handleNoteCreation}
        >
          Create Note
        </LoadingButton>
      </Grid>
    </Grid>
  );
  return (
    <Grid item container>
      {children}
      <OptionsRow />
    </Grid>
  );
};

export default NoteRow;
