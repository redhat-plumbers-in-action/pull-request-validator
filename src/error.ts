export class ValidationError extends Error {
  constructor(
    message: string,
    readonly code?: number
  ) {
    super(message);
  }
}
