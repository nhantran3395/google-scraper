import type {Upload} from "@/models/upload.model";

export type GetUploadsResponse = {
  ok: boolean;
  uploads: Array<Upload>;
};