import { dbClient } from "infra";

export async function getAll(uploadId: string | null, userId: string) {
  if (uploadId) {
    return dbClient.keyword.findMany({
      where: {
        uploadId,
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
        rawHtmlResult: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // no uploadId, return all that belong to user
  return dbClient.keyword.findMany({
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
      rawHtmlResult: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getOne(keywordId: string) {
  return dbClient.keyword.findUnique({
    where: {
      keywordId,
    },
  });
}
