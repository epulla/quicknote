export default interface Note {
  id: string;
  content: string;
  maxViews: number;
  currentView: number;
  created: Date;
  deleted?: Date;
}
