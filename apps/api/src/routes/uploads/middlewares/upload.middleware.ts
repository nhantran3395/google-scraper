import multer, {
  memoryStorage,
  type Options,
  type FileFilterCallback,
} from "multer";

import { type Request } from "express";

import { FileTypeNotSupportedError } from "errors";

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
  fileSize: 1024, //1 KB
};

const options: Options = {
  storage,
  limits,
  fileFilter: csvFilter,
};

export const handleFileUpload = multer(options).single("file");
