
import Note from "./note";
import { CreateNoteInput, GetNoteInput } from "./note.input";

export default interface NoteRepository {
    createNote({content, expiresIn, maxViews}: CreateNoteInput): Promise<GetNoteInput | undefined>
    getNote({url}: GetNoteInput): Promise<Note | undefined>
}