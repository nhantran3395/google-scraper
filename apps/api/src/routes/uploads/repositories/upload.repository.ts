import { ProcessedKeywordResult } from "types";

import { dbClient } from "infra";

export async function createNew(
  userId: string,
  file: Express.Multer.File,
  keywords: Array<ProcessedKeywordResult>
) {
  return dbClient.upload.create({
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
  return dbClient.upload.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
