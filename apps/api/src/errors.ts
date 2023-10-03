import { ERROR_MESSAGE } from "./messages";

export class FileTypeNotSupportedError extends Error {
  constructor() {
    super(`${ERROR_MESSAGE.FILE_TYPE_NOT_SUPPORTED}`);
  }
}
