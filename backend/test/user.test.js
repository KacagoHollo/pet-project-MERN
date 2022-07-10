require('dotenv').config();
const app = require("../app");
const mockserver = require("supertest");
const jwt = require('jsonwebtoken');
const User = require("../model/user");
const Org = require("../model/organization");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");
const mongoose = require('mongoose');

describe("/api/user tests", () => {
    let connection;
    let mongod;
    let client;
  
    beforeAll(async () => {
      [connection, mongod] = await startDb();
      client = mockserver.agent(app);
    });
  
    afterEach(async () => {
      await deleteAll(User);
    });
  
    afterAll(async () => {
      await stopDb(connection, mongod);
    });
  
    test("/create -> returns 200 with valid token", async () => {

        //given
        const newUser = new User({
          username: "Holló",
        });
        await newUser.save();
        const token = jwt.sign({username: newUser.username}, process.env.JWT_SECRET)
        client.set("authorization", token);
    
        //when
        const response = await client.post("/api/user/create").send({
            username: "Munnin",
            // providers: {
            //   "google": "112096385550868436275"
            // },
            name: "Munnin the Raven",
            title: "Prof",
            email: "krar@krar.krar",
            phone: 1212121,
        });
    
        //then
        expect(response.status).toBe(200);
        const responseData = response.body;
        const user = responseData.user;
    
        // expect(user).toHaveLength(1);
        // expect(user.username).toStrictEqual("Munnin");
        // expect(user.name).toStrictEqual("Munnin the Raven");
        // expect(user.title).toStrictEqual("Prof");
        // expect(user.email).toStrictEqual("krar@krar.krar");
        // expect(user.phone).toStrictEqual(1212121);

        expect(user._id).not.toBeUndefined();
       
        const userInDB = await User.findById(newUser._id);
        
        expect((userInDB.user._id).toString()).toBe((user._id));
      });
})