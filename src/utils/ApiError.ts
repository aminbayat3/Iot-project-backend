export class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    // Set the prototype explicitly for extending built-ins in TS
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = "ApiError";
  }
}
