import { getOne, getMany, createOne, updateOne, removeOne } from "../crud";
import mongoose from "mongoose";
import { Parcel } from "../../resources/parcel/parcel.model";
import { connect } from "../db";

describe("crud controllers", () => {
  beforeAll(async () => {
    await connect(); 
  });
  describe("getOne", () => {
    test("finds by id", async () => {
      expect.assertions(2);

      const parcel = await Parcel.create({ name: "parcel", weight: 1 });

      const req = {
        params: {
          id: parcel._id,
        },
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(result) {
          expect(result.data._id.toString()).toBe(parcel._id.toString());
        },
      };

      await getOne(Parcel)(req, res);
    });

    test("404 if no doc was found", async () => {
      expect.assertions(3);

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

      await getOne(Parcel)(req, res);
    });
  });

  describe("createOne", () => {
    test("creates new doc", async () => {
      expect.assertions(2);
      const body = { name: "parcel", weight: 1 };

      const req = {
        body,
      };

      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },
        json(results) {
          expect(results.data.name).toBe(body.name);
        },
      };

      await createOne(Parcel)(req, res);
    });
  });

  describe("updateOne", () => {
    test("finds doc by id to update", async () => {
      expect.assertions(3);

      const parcel = await Parcel.create({ name: "parcel1", weight: 2 });
      const update = { name: "parcel2" };

      const req = {
        params: { id: parcel._id },
        body: update,
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${parcel._id}`);
          expect(results.data.name).toBe(update.name);
        },
      };

      await updateOne(Parcel)(req, res);
    });

    test("400 if no doc", async () => {
      expect.assertions(2);
      const update = { name: "hello" };

      const req = {
        params: { id: mongoose.Types.ObjectId() },
        body: update,
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

      await updateOne(Parcel)(req, res);
    });
  });

  describe("removeone", () => {
    test("remove by _id", async () => {
      expect.assertions(2);

      const parcel = await Parcel.create({ name: "parcel", weight: 1 });

      const req = {
        params: { id: parcel._id },
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${parcel._id}`);
        },
      };

      await removeOne(Parcel)(req, res);
    });
    test("400 if no doc", async () => {
      expect.assertions(2);

      const req = {
        params: { id: mongoose.Types.ObjectId() },
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

      await removeOne(Parcel)(req, res);
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });
});
