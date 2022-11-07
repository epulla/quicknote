import { useState } from "react";
import {
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { GetNoteInput } from "../../../domain/note.input";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { getUrlByRespone } from "../../../application/geturl.app";
import ApiResponse from "../../../../shared/domain/api.response";

type ResponseRowProps = {
  response: ApiResponse<GetNoteInput | undefined> | undefined;
};

const ResponseRow = ({ response }: ResponseRowProps) => {
  const [copyTooltipTitle, setCopyTooltipTitle] = useState<"Copy" | "Copied!">(
    "Copy"
  );

  if (!response) {
    return null;
  }

  return (
    <Grid
      container
      direction="column"
      mb={2}
      style={{ display: response ? "block" : "none" }}
    >
      <Grid item>
        <Typography variant="h6">Result:</Typography>
      </Grid>
      <Paper>
        <Grid item p={3}>
          <OutlinedInput
            fullWidth
            value={getUrlByRespone(response.entity)}
            readOnly={true}
            endAdornment={
              <>
                <InputAdornment position="end">
                  <Tooltip title={copyTooltipTitle} arrow>
                    <IconButton
                      onClick={() => {
                        setCopyTooltipTitle("Copied!");
                        navigator.clipboard.writeText(
                          getUrlByRespone(response.entity)
                        );
                      }}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              </>
            }
          />
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ResponseRow;
