import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffectOnce } from "../../../shared/application/effect-once.app";
import ApiResponse from "../../../shared/domain/api.response";
import ResponseSnackbar from "../../../shared/ui/response-snackbar";
import SimpleBackdrop from "../../../shared/ui/simple-backdrop";
import TitleRow from "../../../shared/ui/title-row";
import Note from "../../domain/note";
import NoteController from "../../infrastructure/note.controller";
import DetailsRow from "./details-row";
import ResponseRow from "./response-row";
import "./style.css";

const GetNoteView = () => {
  let { url } = useParams();

  const [response, setResponse] = useState<
    ApiResponse<Note | undefined> | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffectOnce(() => {
    let fetchNote = async () => {
      if (!url) {
        return;
      }
      setLoading(true);
      let actualResponse = await NoteController.getNote({ url });
      setResponse(actualResponse);
      setLoading(false);
      setOpenSnackbar(true);
    };
    fetchNote();
  });

  return (
    <Box
      id="get-note-section"
      component="section"
      px={{ xs: 5, sm: 10, md: 25 }}
      py={10}
    >
      <SimpleBackdrop loading={loading} />
      <ResponseSnackbar
        response={response}
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        duration={5000}
      />
      <Grid container direction="column" rowSpacing={10}>
        <TitleRow title="QuickNote" imageSrc={undefined} />
        <ResponseRow response={response} />
        <DetailsRow response={response} />
      </Grid>
    </Box>
  );
};

export default GetNoteView;
