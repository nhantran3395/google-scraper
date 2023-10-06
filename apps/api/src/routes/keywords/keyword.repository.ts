import { DatabaseClient } from "../../infra";

export async function getAll(uploadId: string | null, userId: string) {
  if (uploadId) {
    return DatabaseClient.keyword.findMany({
      where: {
        uploadId,
        upload: {
          userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // no uploadId, return all that belong to user
  return DatabaseClient.keyword.findMany({
    where: {
      upload: {
        userId,
      },
    },
    select: {
      resultCount: true,
      createdAt: true,
      keywordId: true,
      linkCount: true,
      adWordsCount: true,
      uploadId: true,
      body: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getOne(keywordId: string) {
  return DatabaseClient.keyword.findUnique({
    where: {
      keywordId,
    },
  });
}
