export default class HttpError extends Error {
  constructor (
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message)
  }
}
