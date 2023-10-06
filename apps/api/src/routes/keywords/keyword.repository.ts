import { DatabaseClient } from "../../infra";

export async function getAll(uploadId: string | null) {
  if (!uploadId) {
    return DatabaseClient.keyword.findMany({
      select: {
        resultCount: true,
        createdAt: true,
        keywordId: true,
        linkCount: true,
        adWordsCount: true,
        uploadId: true,
        body: true,
      },
    });
  }

  return DatabaseClient.keyword.findMany({
    where: {
      uploadId,
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
  });
}

export async function getOne(keywordId: string) {
  return DatabaseClient.keyword.findUnique({
    where: {
      keywordId,
    },
  });
}
