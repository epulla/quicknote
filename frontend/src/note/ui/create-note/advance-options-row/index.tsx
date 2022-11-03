import React from "react";
import {
  Grid,
  Select,
  Typography,
  Paper,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";

type AdvancedOptionsRowProps = {
  isAdvancedOptionChecked: boolean;
  expiresIn: number;
  handleExpiresInSelect: (event: SelectChangeEvent) => void;
  allowedViewsRange: number[];
  maxViews: number;
  handleMaxViewsInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AdvancedOptionsRow = ({
  isAdvancedOptionChecked,
  expiresIn,
  handleExpiresInSelect,
  allowedViewsRange,
  maxViews,
  handleMaxViewsInput,
}: AdvancedOptionsRowProps) => {
  const ExpiresInSelect = () => {
    const expiresInMinutes = [0.5, 1, 5, 15, 30, 60];
    return (
      <Select
        style={{ width: 75 }}
        value={`${expiresIn}`} // value in seconds, it means 30 seconds = 0.5 minutes
        onChange={handleExpiresInSelect}
      >
        {expiresInMinutes.map((minutes, index) => (
          // value is in seconds (minutes * 60)
          <MenuItem value={minutes * 60} key={`minutes-${index}`}>
            {minutes}
          </MenuItem>
        ))}
      </Select>
    );
  };
  const ExpiresInRow = () => (
    <>
      <Grid item xs={4} sm={2}>
        <Typography>Expires in:</Typography>
      </Grid>
      <Grid item xs={8} sm={10} container columnSpacing={2} alignItems="center">
        <Grid item>
          <ExpiresInSelect />
        </Grid>
        <Grid item>
          <Typography>Minutes</Typography>
        </Grid>
      </Grid>
    </>
  );
  const MaxViewsRow = () => {
    const [minViewsAllowed, maxViewsAllowed] = allowedViewsRange;
    return (
      <>
        <Grid item xs={4} sm={2}>
          <Typography>Max views:</Typography>
        </Grid>
        <Grid
          item
          xs={8}
          sm={10}
          container
          columnSpacing={2}
          alignItems="center"
        >
          <Grid item>
            <TextField
              type="number"
              style={{ width: 75 }}
              value={maxViews}
              onChange={handleMaxViewsInput}
            />
          </Grid>
          <Grid item>
            <Typography>{`Views (Must be between ${minViewsAllowed} and ${maxViewsAllowed})`}</Typography>
          </Grid>
        </Grid>
      </>
    );
  };
  return (
    <Paper style={{ display: isAdvancedOptionChecked ? "inherit" : "none" }}>
      <Grid container p={3} alignItems="center" rowSpacing={3}>
        <ExpiresInRow />
        <MaxViewsRow />
      </Grid>
    </Paper>
  );
};

export default AdvancedOptionsRow;
