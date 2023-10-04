import { DatabaseClient } from "../../infra";

export async function getAll() {
  return DatabaseClient.keyword.findMany();
}
