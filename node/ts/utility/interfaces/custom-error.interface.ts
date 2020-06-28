export interface CustomError extends Error {
  message: string;
  status: number;
}