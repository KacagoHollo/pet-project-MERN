require('dotenv').config();
const app = require("../app");
const mockserver = require("supertest");
const jwt = require('jsonwebtoken');
const User = require("../model/user");
const Org = require("../model/organization");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");
const mongoose = require('mongoose');
const { setupGoogleSuccessResponse, setupGoogleErrorResponse } = require("./util/httpMock");

describe("/api/organization tests", () => {
    let connection;
    let mongod;
    let client;
  
    beforeAll(async () => {
      [connection, mongod] = await startDb();
      client = mockserver.agent(app);
    });
  
    afterEach(async () => {
      await deleteAll(User, Org);
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
      const response = await client.get("/api/organization/all").send({
        Org2
    });
  
      //then
      expect(response.body).toStrictEqual({});
      expect(response.status).toBe(404); // for some reason this is returning 200?? 
    });

    test("/create -> returns 200 and post with valid token", async () => {

        const newUser = await User.create({
          username: "Holló",
          name: "Munnin",
          title: "Prof",
          email: "krar@krar.krar",
          phone: 12345,
        })

        const Org1 = await Org.create({
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
        const token = jwt.sign({id: Org1._id, providers: newUser.providers}, process.env.JWT_SECRET);
    
        //when
        const response = await client.post("/api/organization/create").send({

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
        }).set({ authorization : token});
  
        //then
        expect(response.status).toBe(200);

        console.log(response.body)
        const orgs = Org1;

        expect(orgs.email).toStrictEqual("mme@mme.hu");
        expect(orgs.web).toStrictEqual("www.mme.hu");
        expect(orgs.address).toStrictEqual("idk");
        expect(orgs.national_park).toStrictEqual("Any");
        expect(orgs.information).toStrictEqual("Lot");
        expect(orgs.admins).toStrictEqual([]);
        expect(orgs._id).not.toBeUndefined();

      });

    test("/create - returns 401 with invalid token", async () => {
        //given
        const newUser = new User({
          username: "Holló",
          name: "Munnin",
          title: "Prof",
          email: "krar@krar.krar",
          phone: 12345,
        })

        const Org1 = new Org({
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
        const token = jwt.sign({id: Org1._id, providers: newUser.providers}, 'random-token');


        //when
        const response = await client.post("/api/organization/create").send({
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
        }).set({ authorization : token});

        //then
        expect(response.status).toBe(401);
    });
  
      
    test("/create -> return 401 at post (bad token)", async () => {
      // given
      let badToken = "badToken";
            const Org1 = {
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
            }
    
            //when
            const response = await client.post("/api/organization/create").send({
                Org1
            }).set({ authorization: badToken });
    
            // then
            expect(response.status).toBe(401);
        });      



})