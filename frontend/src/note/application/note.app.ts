import { CreateNoteInput, GetNoteInput } from "../domain/note.input";
import NoteRepository from "../domain/note.repository";

export const createNote = async (
  noteRepository: NoteRepository,
  { content, expiresIn, maxViews }: CreateNoteInput
) => {
  return await noteRepository.createNote({ content, expiresIn, maxViews });
};

export const getNote = async (noteRepository: NoteRepository, {url}: GetNoteInput) => {
    return await noteRepository.getNote({url})
}
