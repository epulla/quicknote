import Api from "../../shared/infrastructure/Api";
import Note from "../domain/note";
import { CreateNoteInput, GetNoteInput } from "../domain/note.input";
import NoteRepository from "../domain/note.repository";

export default class ApiNoteRepository implements NoteRepository {
  async createNote({
    content,
    expiresIn,
    maxViews,
  }: CreateNoteInput): Promise<GetNoteInput | undefined> {
    try {
      const response = await Api.post("/api/create_note", {
        content,
        expires_in: expiresIn,
        max_views: maxViews,
      });
      return response?.data;
    } catch (error: any) {
      console.log(error);
    }
  }

  async getNote({ url }: GetNoteInput): Promise<Note | undefined> {
    try {
      const response = await Api.get(`/api/note/${url}`);
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  }
}
