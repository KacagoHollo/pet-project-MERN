require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");
// const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../model/user");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");

describe("requests to api/dashboards", () => {
  let connection;
  let server;
  let client;

  beforeAll(async () => {
    const result = await startDb();
    connection = result[0];
    server = result[1];
    client = mockServer.agent(app);
  });

  afterEach(async () => {
    await deleteAll(User);
  });

  afterAll(async () => {
    await stopDb(connection, server);
  });

  test("new user returns an empty list and 200", async () => {
    // given
    const JohnDoe = new User({
      username: "JohnDoe",
    });
    await JohnDoe.save();
    const token = jwt.sign({ userId: JohnDoe._id }, process.env.JWT_SECRET);

    client.set("authorization", token);
    // can be multiple client.set();

    // when
    const response = await client.get("/api/user/all");

    // then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData.user).toStrictEqual([]);
  });

  test("deleted user returns null object", async () => {
    // given
    const JohnDoe = new User({
      username: "JohnDoe",
    });
    await JohnDoe.save();
    const token = jwt.sign({ userId: JohnDoe._id }, process.env.JWT_SECRET);

    await User.deleteMany();

    client.set("authorization", token);

    // when
    const response = await client.get("/api/user/all");

    // then
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ user: null });
  });
  
});