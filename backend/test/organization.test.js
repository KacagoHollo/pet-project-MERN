require('dotenv').config();
const app = require("../app");
const mockserver = require("supertest");
const jwt = require('jsonwebtoken');
const User = require("../model/user");
const Org = require("../model/organization");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");
const mongoose = require('mongoose');

describe("/api/organization tests", () => {
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

    test("/all -> status 200 and list all of the organizations in the db", async () => {

        //given
        const id = '62c9eb23f441791e5f554e8e'
        const Org1 = new Org({
            _id: id,
            name: "MME",
            description: "Birds everywhere",
            help: "any",
            availability: "Anytime",
            phone: 11111111,
            email: "mme@mme.hu",
            web: "www.mme.hu",
            address: "idk",
            national_park: "Any",
            information: "Lot",
            admins: [],
        });
        await Org1.save();
    
        //when
        const response = await client.get("/api/organization/all");
    
        //then
        expect(response.status).toBe(200);
        const responseData = response.body;
        expect(responseData).toStrictEqual([{
            "_id": '62c9eb23f441791e5f554e8e',
              "name": "MME",
              "description": "Birds everywhere",
              "help": "any",
              "availability": "Anytime",
              "phone": 11111111,
              "email": "mme@mme.hu",
              "web": "www.mme.hu",
              "address": "idk",
              "national_park": "Any",
              "information": "Lot",
              "admins": [],
              "__v": 0
            }]);
      });
    test("/all -> status 200 and post", async () => {

        //given
        const id = '62c9eb23f441791e5f554e8e'
        const Org1 = new Org({
            _id: id,
            name: "MME",
            description: "Birds everywhere",
            help: "any",
            availability: "Anytime",
            phone: 11111111,
            email: "mme@mme.hu",
            web: "www.mme.hu",
            address: "idk",
            national_park: "Any",
            information: "Lot",
            admins: [],
        });
        await Org1.save();
    
        //when
        const response = await client.post("/api/organization/create");
    
        //then
        expect(response.status).toBe(200);
        const responseData = response.body;
        expect(responseData).toStrictEqual([{
            "_id": '62c9eb23f441791e5f554e8e',
              "name": "MME",
              "description": "Birds everywhere",
              "help": "any",
              "availability": "Anytime",
              "phone": 11111111,
              "email": "mme@mme.hu",
              "web": "www.mme.hu",
              "address": "idk",
              "national_park": "Any",
              "information": "Lot",
              "admins": [],
              "__v": 0
            }]);
      });

      test("/all -> returns 404 if the db is empty", async () => {
        //given
        const id = '62c9eb23f441791e5f554e88'
        const Org2 = new Org({
            _id: id,
            name: "MME",
            description: "Birds everywhere",
            help: "any",
            availability: "Anytime",
            phone: 11111111,
            email: "mme@mme.hu",
            web: "www.mme.hu",
            address: "idk",
            national_park: "Any",
            information: "Lot",
            admins: [],
        });
        await Org2.save();
        await Org.deleteMany();
    
        //when
        const response = await client.get("/api/organization/all");
    
        //then
        expect(response.body).toStrictEqual({});
        expect(response.status).toBe(404); // for some reason this is returning 200?? 
      });
    
      

})