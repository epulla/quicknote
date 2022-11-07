import ApiResponse from "../../shared/domain/api.response";
import Api from "../../shared/infrastructure/Api";
import Note from "../domain/note";
import { CreateNoteInput, GetNoteInput } from "../domain/note.input";
import NoteRepository from "../domain/note.repository";

export default class ApiNoteRepository implements NoteRepository {
  async createNote({
    content,
    expiresIn,
    maxViews,
  }: CreateNoteInput): Promise<ApiResponse<GetNoteInput | undefined>> {
    try {
      const response = await Api.post("/api/create_note", {
        content,
        expires_in: expiresIn,
        max_views: maxViews,
      });
      return {
        entity: response?.data,
        status: response?.status,
        message: "Your note has been created!",
      };
    } catch (error: any) {
      return this.getErrorResponse(error);
    }
  }

  async getNote({ url }: GetNoteInput): Promise<ApiResponse<Note | undefined>> {
    try {
      const response = await Api.get(`/api/note/${url}`);
      const entity = {
        ...response?.data,
        maxViews: response?.data.max_views,
        currentView: response?.data.current_view,
        created: new Date(response?.data.created),
        deleted: response?.data.deleted
          ? new Date(response?.data.deleted)
          : undefined,
      } as Note;
      return {
        entity: entity,
        status: response?.status,
        message: "Note successfully decrypted!",
      };
    } catch (error: any) {
      return this.getErrorResponse(error);
    }
  }

  private getErrorResponse(error: any): ApiResponse<undefined> {
    // if there is no response, it is asumed the error is on the server side (status: 500)
    return {
      entity: undefined,
      status: error.response ? error.response.status : 500,
      message: error.response
        ? error.response.data.detail
        : "Oops! Something happened :(",
    };
  }
}
