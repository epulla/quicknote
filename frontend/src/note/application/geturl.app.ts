import { GetNoteInput } from "../domain/note.input";

export const getUrlByRespone = (getInputNote: GetNoteInput | undefined) => {
  if (!getInputNote) {
    return window.location.href;
  }
  return `${window.location.protocol}//${window.location.host}${window.location.pathname}/${getInputNote.url}`;
};
