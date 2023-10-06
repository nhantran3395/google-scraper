import supertest from "supertest";

import { createServer } from "server";

describe("authMiddleware", () => {
  it("request is rejected when there is no token", async () => {
    const app = createServer();

    const res = await supertest(app).get("/keywords");

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      ok: false,
      message: "must have a bearer token",
    });
  });

  it("request is rejected when token is not in bearer format", async () => {
    const app = createServer();

    const res = await supertest(app)
      .get("/keywords")
      .set("authorization", "12345");

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      ok: false,
      message: "invalid bearer token format",
    });
  });

  it("request is rejected when token is invalid", async () => {
    const app = createServer();

    const res = await supertest(app)
      .get("/keywords")
      .set("authorization", "Bearer 12345");

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      ok: false,
      message: "token is invalid",
    });
  });
});
