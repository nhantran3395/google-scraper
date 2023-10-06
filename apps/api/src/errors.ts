export const ERROR_MESSAGE = {
  AUTH_BEARER_TOKEN_NOT_EXIST: "must have a bearer token",
  AUTH_TOKEN_INVALID_FORMAT: "invalid bearer token format",
  AUTH_TOKEN_INVALID: "token is invalid",
  AUTH_INVALID_TOKEN_PAYLOAD: "type of JWT payload is invalid",
  LOGIN_INVALID_CREDENTIAL: "email or password is invalid",
  REGISTER_EMAIL_ALREADY_EXIST: "a user with this email already exists",
  SERVER_ERROR: "something unexpected happened on the server",
  FILE_TYPE_NOT_SUPPORTED: "file type is not supported",
};

export class FileTypeNotSupportedError extends Error {
  constructor() {
    super(`${ERROR_MESSAGE.FILE_TYPE_NOT_SUPPORTED}`);
  }
}
