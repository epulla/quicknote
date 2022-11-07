export default interface ApiResponse<T> {
  entity: T;
  status: number;
  message: string;
}
