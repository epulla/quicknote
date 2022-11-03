export interface CreateNoteInput {
  content: string;
  expiresIn: number;
  maxViews: number;
}

export interface GetNoteInput {
  url: string;
}
