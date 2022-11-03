import { createNote, getNote } from "../application/note.app";
import { CreateNoteInput, GetNoteInput } from "../domain/note.input";
import NoteRepository from "../domain/note.repository";
import ApiNoteRepository from "./api-note.repository";

const noteRepository: NoteRepository = new ApiNoteRepository();

export default class NoteController {
  static async createNote({ content, expiresIn, maxViews }: CreateNoteInput) {
    return await createNote(noteRepository, { content, expiresIn, maxViews });
  }

  static async getNote({ url }: GetNoteInput) {
    return await getNote(noteRepository, { url });
  }
}
