require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");
const User = require("../model/user");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");
const { setupGoogleSuccessResponse, setupGoogleErrorResponse } = require("./util/httpMock");

describe("POST requests to api/user/login", () => {
  let connection;
  let server;
  let client;

  beforeAll(async () => {
    const result = await startDb();
    connection = result[0];
    server = result[1];
    client = mockServer.agent(app);
  });

  afterAll(async () => {
    await stopDb(connection, server);
  });

  afterEach(async () => {
    await deleteAll(User);
  });

  test("should return 400 without body", async () => {
    // given

    // when
    const response = await client.post("/api/user/login").send({});

    // then
    expect(response.status).toBe(400);
  });

  test("should return 400 without provider", async () => {
    // given
    const code = "random";

    // when
    const response = await client.post("/api/user/login").send({ code });

    // then
    expect(response.status).toBe(400);
  });

  test("should return 400 without code", async () => {
    // given
    const provider = "google";

    // when
    const response = await client.post("/api/user/login").send({ provider });

    // then
    expect(response.status).toBe(400);
  });

  test("should return 400 with invalid provider (user not created)", async () => {
    // given
    const code = "random";
    const provider = "gitlab";

    // when
    const response = await client.post("/api/user/login").send({
      code,
      provider,
    });

    // then
    expect(response.status).toBe(400);
  });

  test("should return 200 with valid provider id (user not created)", async () => {
    // given
    const code = "4/0AdQt8qhwZsDe-lXJAqgSrsYQfkubLXrC-0CZHUwK52q9PKKeBa2CQRdObsVpG5VmLOEI2w";
    const provider = "google";
    setupGoogleSuccessResponse("7458tygbhf78");

    // when
    const response = await client.post("/api/user/login").send({
      code,
      provider,
    });

    // then
    expect(response.status).toBe(200);
  });

  test("should return 200 with jwt valid provider id (user not created)", async () => {
    // given
    const code = "4/0AdQt8qhwZsDe-lXJAqgSrsYQfkubLXrC-0CZHUwK52q9PKKeBa2CQRdObsVpG5VmLOEI2w";
    const provider = "google";
    const googleUserId = "vshdg674t7ryfgb";
    setupGoogleSuccessResponse(googleUserId);

    // when
    const response = await client.post("/api/user/login").send({
      code,
      provider,
    });

    // then
    expect(response.status).toBe(200);
    const responseToken = jwt.decode(response.body.token);
    expect(responseToken.providers.google).toBe(googleUserId);
    const users = await User.find();
    expect(users).toStrictEqual([]);
  });

  test("should return 401 with invalid code (user not created)", async () => {
    // given
    const code = "4/0AdQt8qhwZsDe-lXJAqgSrsYQfkubLXrC-0CZHUwK52q9PKKeBa2CQRdObsVpG5VmLOEI2w";
    const provider = "google";
    setupGoogleErrorResponse();

    // when
    const response = await client.post("/api/user/login").send({
      code,
      provider,
    });

    // then
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({});
    const users = await User.find();
    expect(users).toStrictEqual([]);
  });
});