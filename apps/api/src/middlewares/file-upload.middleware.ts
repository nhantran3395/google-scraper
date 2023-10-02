import multer, {
  memoryStorage,
  type Options,
  type FileFilterCallback,
} from "multer";

import { type Request } from "express";

import { ERROR_MESSAGE } from "../messages.ts";

function csvFilter(
  _req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) {
  if (file.mimetype !== "text/csv") {
    callback(new Error(ERROR_MESSAGE.FILE_TYPE_NOT_SUPPORTED));
  }

  callback(null, file.mimetype === "text/csv");
}

const storage = memoryStorage();

const limits = {
  fileSize: 1024, //1 KB
};

const options: Options = {
  storage,
  limits,
  fileFilter: csvFilter,
};

export const fileUpload = multer(options).single("file");
