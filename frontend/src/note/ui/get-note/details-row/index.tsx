import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import ApiResponse from "../../../../shared/domain/api.response";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MessageRow from "../../../../shared/ui/message-row";
import Note from "../../../domain/note";

type DetailsRowProps = {
  response: ApiResponse<Note | undefined> | undefined;
};

const DetailsRow = ({ response }: DetailsRowProps) => {
  if (!response || !response?.entity) {
    return null;
  }

  return (
    <Grid item>
      <Paper>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>More details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{`ID: ${response.entity.id}`}</Typography>
            <Typography>{`Created on: ${response.entity.created}`}</Typography>
            {response.entity.deleted && (
              <Typography>
                {`Deleted on: ${response.entity.deleted}`}
              </Typography>
            )}
            <Typography>{`Current view: ${response.entity.currentView}`}</Typography>
            <Typography>{`Max views: ${response.entity.maxViews}`}</Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Grid>
  );
};

export default DetailsRow;
