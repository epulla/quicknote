import React, { useState } from "react";
import { Grid, Box, SelectChangeEvent } from "@mui/material";
import TitleRow from "../../../shared/ui/title-row";
import NoteRow from "./note-row";
import AdvancedOptionsRow from "./advance-options-row";
import {
  ADVANCED_OPTION_SWITCH_DEFAULT_VALUE,
  ALLOWED_VIEW_RANGE,
  EXPIRES_IN_DEFAULT_VALUE,
  MAX_VIEWS_DEFAULT_VALUE,
} from "./defaults.constants";
import NoteController from "../../infrastructure/note.controller";
import SimpleBackdrop from "../../../shared/ui/simple-backdrop";
import ResponseSnackbar from "../../../shared/ui/response-snackbar";
import { GetNoteInput } from "../../domain/note.input";
import NoteInputComponent from "./note-input-component";
import ResponseRow from "./response-row";
import "./style.css";
import ApiResponse from "../../../shared/domain/api.response";
import MessageRow from "../../../shared/ui/message-row";

const CreateNoteView = () => {
  // Constants
  const allowedViewsRange = ALLOWED_VIEW_RANGE;

  // States
  const [isAdvancedOptionChecked, setIsAdvancedOptionChecked] = useState(
    ADVANCED_OPTION_SWITCH_DEFAULT_VALUE
  );
  const [noteContent, setNoteContent] = useState("");
  const [expiresIn, setExpiresIn] = useState(EXPIRES_IN_DEFAULT_VALUE); // in seconds
  const [maxViews, setMaxViews] = useState(MAX_VIEWS_DEFAULT_VALUE);
  const [response, setResponse] = useState<
    ApiResponse<GetNoteInput | undefined> | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handlers of States
  const handleAdvancedOptionSwitch = () => {
    setIsAdvancedOptionChecked(!isAdvancedOptionChecked);
  };
  const handleNoteContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNoteContent(event.target.value);
  };
  const handleExpiresInSelect = (event: SelectChangeEvent) => {
    setExpiresIn(parseInt(event.target.value as string));
  };
  const handleMaxViewsInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    const [minViewsAllowed, maxViewsAllowed] = allowedViewsRange;
    const isValidMaxViewValue =
      value >= minViewsAllowed && value <= maxViewsAllowed;
    if (!isValidMaxViewValue) {
      return;
    }
    setMaxViews(value);
  };

  // Handles the note creation with all the required values
  const handleNoteCreation = async () => {
    setLoading(true);
    let actualResponse = await NoteController.createNote({
      content: noteContent,
      expiresIn,
      maxViews,
    });
    setResponse(actualResponse);
    setLoading(false);
    setOpenSnackbar(true);
  };

  return (
    <Box
      id="create-note-section"
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
        <NoteRow
          loading={loading}
          isAdvancedOptionChecked={isAdvancedOptionChecked}
          handleAdvancedOptionSwitch={handleAdvancedOptionSwitch}
          handleNoteCreation={handleNoteCreation}
        >
          <NoteInputComponent
            handleNoteContentChange={handleNoteContentChange}
          />
          <MessageRow
            variant="h6"
            message={`This note will expire in ${
              expiresIn / 60
            } minute(s) and can be opened ${maxViews} time(s)`}
          />
        </NoteRow>
        <ResponseRow response={response} />
        <AdvancedOptionsRow
          isAdvancedOptionChecked={isAdvancedOptionChecked}
          expiresIn={expiresIn}
          handleExpiresInSelect={handleExpiresInSelect}
          allowedViewsRange={allowedViewsRange}
          maxViews={maxViews}
          handleMaxViewsInput={handleMaxViewsInput}
        />
      </Grid>
    </Box>
  );
};

export default CreateNoteView;
