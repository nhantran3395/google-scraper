import { DatabaseClient } from "../../infra";

export async function getAll(uploadId: string | null) {
  if (!uploadId) {
    return DatabaseClient.keyword.findMany();
  }

  return DatabaseClient.keyword.findMany({
    where: {
      uploadId,
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
