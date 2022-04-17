"use strict";

var _truck = _interopRequireDefault(require("../truck.controllers"));

var _lodash = require("lodash");

var _parcel = require("../../parcel/parcel.model");

var _truck2 = require("../truck.model");

var _db = require("../../../utils/db");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("truck controllers", () => {
  beforeAll(async () => {
    await (0, _db.connect)();
  });
  describe("controllers", () => {
    test("has operations", () => {
      const methods = ["getOne", "getMany", "createOne", "removeOne", "updateOne", "loadParcel", "unloadParcel"];
      methods.forEach(name => {
        expect((0, _lodash.isFunction)(_truck.default[name])).toBe(true);
      });
    });
  });
  describe("loading parcels", () => {
    test("load parcel into truck", async () => {
      expect.assertions(3);
      const parcel = await _parcel.Parcel.create({
        name: "parcel",
        weight: 1
      });
      const truck = await _truck2.Truck.create({
        name: "truck1"
      });
      const update = {
        parcel: parcel._id.toString()
      };
      const req = {
        params: {
          id: truck._id
        },
        body: update
      };
      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },

        json(results) {
          expect(`${results.data._id}`).toBe(`${truck._id}`);
          expect(results.data.parcels[0].toString()).toBe(update.parcel);
        }

      };
      await _truck.default.loadParcel(req, res);
    });
    test("404 if no doc was found", async () => {
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
      await _truck.default.loadParcel(req, res);
    });
  });
  describe("unloading parcels", () => {
    test("unload parcel from truck", async () => {
      expect.assertions(3);
      const parcel = await _parcel.Parcel.create({
        name: "parcel",
        weight: 1
      });
      const truck = await _truck2.Truck.create({
        name: "truck1",
        parcels: [parcel._id],
        weight: parcel.weight
      });
      const update = {
        parcel: parcel._id
      };
      const req = {
        params: {
          id: truck._id
        },
        body: update
      };
      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },

        json(results) {
          expect(`${results.data._id}`).toEqual(`${truck._id}`);
          expect(results.data.parcels).toEqual([]);
        }

      };
      await _truck.default.unloadParcel(req, res);
    });
    test("404 if no doc was found", async () => {
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
      await _truck.default.unloadParcel(req, res);
    });
  });
  afterAll(async () => {
    await _mongoose.default.connection.db.dropDatabase();
    await _mongoose.default.connection.close();
  });
});