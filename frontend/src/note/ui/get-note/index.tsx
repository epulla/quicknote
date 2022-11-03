import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffectOnce } from "../../../shared/application/effect-once.app";
import Note from "../../domain/note";
import NoteController from "../../infrastructure/note.controller";
import "./style.css";

const GetNoteView = () => {
  let { url } = useParams();

  const [note, setNote] = useState<Note | undefined>(undefined);

  useEffectOnce(() => {
    let fetchNote = async () => {
      if (!url) return;
      let actualResponse = await NoteController.getNote({ url });
      setNote(actualResponse);
      console.log("Fetched");
    };
    fetchNote();
  });

  return <h1>{note?.content}</h1>;
};

export default GetNoteView;
