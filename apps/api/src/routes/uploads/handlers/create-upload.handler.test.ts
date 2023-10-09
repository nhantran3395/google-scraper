import supertest from "supertest";

import { createServer } from "server";
import { configs } from "configs";

import { uploadRepository } from "../repositories";
import * as scraper from "../helpers/scraper";

jest.mock("configs", () => {
  return {
    configs: {
      JWT_SECRET: "just a test",
      FILE_UPLOAD_MAX_KEYWORD_LIMIT: 4,
      FILE_UPLOAD_MAX_SIZE: 150,
    },
  };
});

jest.mock("../repositories", () => {
  return {
    uploadRepository: {
      createNew: jest.fn().mockImplementation(() => {}),
    },
  };
});

jest.mock("../helpers/scraper", () => {
  const original = jest.requireActual("../helpers/scraper");

  return {
    ...original,
    scrape: jest.fn().mockImplementation(() => []),
  };
});

async function sendUploadKeywordsRequest(path: string): Promise<any> {
  const app = createServer();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.ZbNYWPJeFZcXiXpyRyNJGJGb2XTblHfHddmTlIFcStQ";

  return supertest(app)
    .post("/uploads")
    .set("Authorization", `Bearer ${token}`)
    .attach("file", path);
}

describe("createUploadHandler", () => {
  const TEST_DATA_BASE_PATH = "test_data/upload_keywords";

  it("request is rejected with 400 when file has an empty line", async () => {
    const res = await sendUploadKeywordsRequest(
      `${TEST_DATA_BASE_PATH}/has-empty-line.csv`
    );

    expect(res.status).toBe(400);

    expect(res.body).toEqual({
      ok: false,
      message:
        "file must not contains any empty line or line that has only whitespace",
    });
  });

  it("request is rejected with 400 when file has line with only whitespaces", async () => {
    const res = await sendUploadKeywordsRequest(
      `${TEST_DATA_BASE_PATH}/has-line-with-whitespaces-only.csv`
    );

    expect(res.status).toBe(400);

    expect(res.body).toEqual({
      ok: false,
      message:
        "file must not contains any empty line or line that has only whitespace",
    });
  });

  it("request is rejected with 400 when file exceed keywords limit", async () => {
    const res = await sendUploadKeywordsRequest(
      `${TEST_DATA_BASE_PATH}/exceed-keywords-limit.csv`
    );

    expect(res.status).toBe(400);

    expect(res.body).toEqual({
      ok: false,
      message: "file must be less than 4 keywords",
    });
  });

  it("request is rejected with 400 when file exceeds max size limit", async () => {
    const res = await sendUploadKeywordsRequest(
      `${TEST_DATA_BASE_PATH}/exceed-max-size-limit.csv`
    );

    expect(res.status).toBe(400);

    expect(res.body).toEqual({
      ok: false,
      message: "File too large",
    });
  });

  it("request can go through when file satisfy all rules", async () => {
    const res = await sendUploadKeywordsRequest(
      `${TEST_DATA_BASE_PATH}/valid.csv`
    );

    expect(scraper.scrape).toHaveBeenCalledTimes(1);
    expect(uploadRepository.createNew).toHaveBeenCalledTimes(1);

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      ok: true,
    });
  });
});
