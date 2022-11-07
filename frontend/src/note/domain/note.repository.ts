import ApiResponse from "../../shared/domain/api.response";
import Note from "./note";
import { CreateNoteInput, GetNoteInput } from "./note.input";

export default interface NoteRepository {
  createNote({
    content,
    expiresIn,
    maxViews,
  }: CreateNoteInput): Promise<ApiResponse<GetNoteInput | undefined>>;
  getNote({ url }: GetNoteInput): Promise<ApiResponse<Note | undefined>>;
}
