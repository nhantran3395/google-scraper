import { ProcessedKeywordResult } from "../../types";
import { DatabaseClient } from "../../infra";

export async function createNew(
  userId: string,
  file: Express.Multer.File,
  keywords: Array<ProcessedKeywordResult>
) {
  return DatabaseClient.upload.create({
    data: {
      userId: userId,
      name: file.originalname,
      keywordCount: keywords.length,
      keywords: {
        create: [...keywords],
      },
    },
  });
}

export async function getAll(userId: string) {
  return DatabaseClient.upload.findMany({
    where: {
      userId,
    },
  });
}
