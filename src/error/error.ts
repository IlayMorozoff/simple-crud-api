export class CustomError extends Error {
  message: string = '';
  status: number = 200;
  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}