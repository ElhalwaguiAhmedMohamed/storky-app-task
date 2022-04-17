"use strict";

var _crud = require("../crud");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _parcel = require("../../resources/parcel/parcel.model");

var _db = require("../db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("crud controllers", () => {
  beforeAll(async () => {
    await (0, _db.connect)();
  });
  describe("getOne", () => {
    test("finds by id", async () => {
      expect.assertions(2);
      const parcel = await _parcel.Parcel.create({
        name: "parcel",
        weight: 1
      });
      const req = {
        params: {
          id: parcel._id
        }
      };
      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },

        json(result) {
          expect(result.data._id.toString()).toBe(parcel._id.toString());
        }

      };
      await (0, _crud.getOne)(_parcel.Parcel)(req, res);
    });
    test("404 if no doc was found", async () => {
      expect.assertions(3);
      const req = {
        params: {
          id: _mongoose.default.Types.ObjectId()
        }
      };
      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },

        end() {
          expect(true).toBe(true);
        }

      };
      await (0, _crud.getOne)(_parcel.Parcel)(req, res);
    });
  });
  describe("createOne", () => {
    test("creates new doc", async () => {
      expect.assertions(2);
      const body = {
        name: "parcel",
        weight: 1
      };
      const req = {
        body
      };
      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },

        json(results) {
          expect(results.data.name).toBe(body.name);
        }

      };
      await (0, _crud.createOne)(_parcel.Parcel)(req, res);
    });
  });
  describe("updateOne", () => {
    test("finds doc by id to update", async () => {
      expect.assertions(3);
      const parcel = await _parcel.Parcel.create({
        name: "parcel1",
        weight: 2
      });
      const update = {
        name: "parcel2"
      };
      const req = {
        params: {
          id: parcel._id
        },
        body: update
      };
      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },

        json(results) {
          expect(`${results.data._id}`).toBe(`${parcel._id}`);
          expect(results.data.name).toBe(update.name);
        }

      };
      await (0, _crud.updateOne)(_parcel.Parcel)(req, res);
    });
    test("400 if no doc", async () => {
      expect.assertions(2);
      const update = {
        name: "hello"
      };
      const req = {
        params: {
          id: _mongoose.default.Types.ObjectId()
        },
        body: update
      };
      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },

        end() {
          expect(true).toBe(true);
        }

      };
      await (0, _crud.updateOne)(_parcel.Parcel)(req, res);
    });
  });
  describe("removeone", () => {
    test("remove by _id", async () => {
      expect.assertions(2);
      const parcel = await _parcel.Parcel.create({
        name: "parcel",
        weight: 1
      });
      const req = {
        params: {
          id: parcel._id
        }
      };
      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },

        json(results) {
          expect(`${results.data._id}`).toBe(`${parcel._id}`);
        }

      };
      await (0, _crud.removeOne)(_parcel.Parcel)(req, res);
    });
    test("400 if no doc", async () => {
      expect.assertions(2);
      const req = {
        params: {
          id: _mongoose.default.Types.ObjectId()
        }
      };
      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },

        end() {
          expect(true).toBe(true);
        }

      };
      await (0, _crud.removeOne)(_parcel.Parcel)(req, res);
    });
  });
  afterAll(async () => {
    await _mongoose.default.connection.db.dropDatabase();
    await _mongoose.default.connection.close();
  });
});