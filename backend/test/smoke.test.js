require("dotenv").config();
const app = require("../app");
const mockServer = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

test("/random endpoint sends 404", async () => {
  // given
  const client = mockServer(app);
  // when
  const response = await client.get("/api/random");
  // then
  expect(response.status).toBe(404);
});

/* === /// === */

test("mongo-in-memory server is running", async () => {
  // given
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const connection = await mongoose.connect(uri);

  // fake mongo data
  const Raven = mongoose.model("Raven", { name: String });
  const corvid = new Raven({ name: "Munnin" });

  // when
  await corvid.save();

  // then
  const raven = await Raven.findOne();
  expect(raven.name).toBe("Munnin");

  // stop fake mongo
  await connection.disconnect();
  await mongod.stop();
});