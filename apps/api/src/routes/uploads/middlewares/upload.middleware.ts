import multer, {
  memoryStorage,
  type Options,
  type FileFilterCallback,
} from "multer";

import { type Request } from "express";

import { FileTypeNotSupportedError } from "errors";
import { configs } from "configs";

function csvFilter(
  _req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) {
  if (file.mimetype !== "text/csv") {
    callback(new FileTypeNotSupportedError());
  }

  callback(null, file.mimetype === "text/csv");
}

const storage = memoryStorage();

const limits = {
  fileSize: configs.FILE_UPLOAD_MAX_SIZE,
};

const options: Options = {
  storage,
  limits,
  fileFilter: csvFilter,
};

export const handleFileUpload = multer(options).single("file");
