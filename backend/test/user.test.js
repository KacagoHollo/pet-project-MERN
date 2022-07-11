require('dotenv').config();
const app = require("../app");
const mockserver = require("supertest");
const jwt = require('jsonwebtoken');
const User = require("../model/user");
const Org = require("../model/organization");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");
const mongoose = require('mongoose');
const { setupGoogleSuccessResponse, setupGoogleErrorResponse } = require("./util/httpMock");

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
          // providers: {
          //   google: 3333,
          // },
          name: "Munnin",
          title: "Prof",
          email: "krar@krar.krar",
          phone: 12345,

        });
        await newUser.save();
        const token = jwt.sign({userId: newUser._id, providers: newUser.providers}, process.env.JWT_SECRET)
       
    
        //when
        const response = await client.post("/api/user/create").send({
          username: "Holló",

          name: "Munnin",
          title: "Prof",
          email: "krar@krar.krar",
          phone: 12345,
        }).set({ authorization : token});;
    
        //then
        expect(response.status).toBe(200);
        const user = newUser;
        expect(user.username).toStrictEqual("Holló");
        expect(user.name).toStrictEqual("Munnin");
        expect(user.title).toStrictEqual("Prof");
        expect(user.email).toStrictEqual("krar@krar.krar");
        expect(user.phone).toStrictEqual(12345);


      });

      test("/:id - if the id matches something in the db, it is deleted", async () => {
        //given
        // const id = '62cc5544fb8e796a0c322c44'
        const newUser = new User({
          username: "Holló",
          name: "Munnin",
          title: "Prof",
          email: "krar@krar.krar",
          phone: 12345,
        });

        await newUser.save();
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET)
        client.set("authorization", token);
    
        //when
        const response = await client.delete("/api/user/" + newUser._id);
    
        //then
        expect(response.status).toBe(200);
      });

    test("/patch -> returns 404 with valid token", async () => {

        //given
        const newUser = new User({
          username: "Holló",
          providers: {
            google: 3333,
          },
          name: "Munnin",
          title: "Prof",
          email: "krar@krar.krar",
          phone: 12345,

        });
        await newUser.save();
        const token = jwt.sign({userId: newUser._id, providers: newUser.providers}, process.env.JWT_SECRET)
        client.set("authorization", token);
    
        //when
        const response = await client.post("/api/user/update").send({
          newUser
        })

        //then
        expect(response.status).toBe(404);
      });
    test("/create -> returns 404 with valid token", async () => {

        //given
        const newUser = new User({
          username: "Holló",
          providers: {
            google: 3333,
          },
          name: "Munnin",
          title: "Prof",
          email: "krar@krar.krar",
          phone: 12345,

        });
        await newUser.save();
        const token = jwt.sign({userId: newUser._id, providers: newUser.providers}, process.env.JWT_SECRET)
        client.set("authorization", token);
    
        //when
        const response = await client.post("/api/user/create").send({
          newUser
        })

        //then
        expect(response.status).toBe(404);
      });


test("/all -> status 200 and list all of the users in the db", async () => {

  //given
  const User1 = new User({
      _id: "62cc590ffab582c1fa00a107",
      username: "Bird",
      name: "JohnDoe",
      title: "student",
      email: "nobody@nobody.com",
      phone: 12345,
      
  });
  await User1.save();

  //when
  const response = await client.get("/api/user/all");

  //then
  expect(response.status).toBe(200);
  const responseData = response.body;
  expect(responseData).toStrictEqual([{
      "_id": "62cc590ffab582c1fa00a107",
      "username": "Bird",
      "name": "JohnDoe",
      "title": "student",
      "email": "nobody@nobody.com",
      "phone": 12345,
        "__v": 0
      }]);
  });
test("/all -> status 404", async () => {

  //given
  const User1 = new User({
      _id: "62cc590ffab582c1fa00a107",
      username: "Bird",
      name: "JohnDoe",
      title: "student",
      email: "nobody@nobody.com",
      phone: 12345,
      
  });

  await User1.save();
  await User.deleteMany();

  //when
  const response = await client.get("/api/user/all");

  //then
  expect(response.status).toBe(404);
 
  });

})