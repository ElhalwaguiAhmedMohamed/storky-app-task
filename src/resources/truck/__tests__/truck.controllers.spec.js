import controllers from "../truck.controllers";
import { isFunction } from "lodash";
import { Parcel } from "../../parcel/parcel.model";
import { Truck } from "../truck.model";
import { connect } from "../../../utils/db";
import mongoose from "mongoose";

describe("truck controllers", () => {
  beforeAll(async () => {
    await connect();
  });
  describe("controllers", () => {
    test("has operations", () => {
      const methods = [
        "getOne",
        "getMany",
        "createOne",
        "removeOne",
        "updateOne",
        "loadParcel",
        "unloadParcel",
      ];
      methods.forEach((name) => {
        expect(isFunction(controllers[name])).toBe(true);
      });
    });
  });

  describe("loading parcels", () => {
    test("load parcel into truck", async () => {
      expect.assertions(3);
      const parcel = await Parcel.create({ name: "parcel", weight: 1 });
      const truck = await Truck.create({ name: "truck1" });
      const update = { parcel: parcel._id.toString() };

      const req = {
        params: { id: truck._id },
        body: update,
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${truck._id}`);
          expect(results.data.parcels[0].toString()).toBe(update.parcel);
        },
      };

      await controllers.loadParcel(req, res);
    });

    test("404 if no doc was found", async () => {
      expect.assertions(2);

      const req = {
        params: {
          id: mongoose.Types.ObjectId(),
        },
      };

      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        end() {
          expect(true).toBe(true);
        },
      };

      await controllers.loadParcel(req, res);
    });
  });

  describe("unloading parcels", () => {
    test("unload parcel from truck", async () => {
      expect.assertions(3);

      const parcel = await Parcel.create({ name: "parcel", weight: 1 });
      const truck = await Truck.create({
        name: "truck1",
        parcels: [parcel._id],
        weight: parcel.weight,
      });
      const update = { parcel: parcel._id };
      const req = {
        params: { id: truck._id },
        body: update,
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(results) {
          expect(`${results.data._id}`).toEqual(`${truck._id}`);
          expect(results.data.parcels).toEqual([]);
        },
      };

      await controllers.unloadParcel(req, res);
    });

    test("404 if no doc was found", async () => {
      expect.assertions(2);

      const req = {
        params: {
          id: mongoose.Types.ObjectId(),
        },
      };

      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        end() {
          expect(true).toBe(true);
        },
      };

      await controllers.unloadParcel(req, res);
    });
  });
  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });
});
