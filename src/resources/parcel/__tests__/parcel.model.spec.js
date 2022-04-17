import mongoose from "mongoose";
import { Parcel } from "../parcel.model";

describe("Parcel model", () => {
  describe("schema", () => {
    test("name", () => {
      const name = Parcel.schema.obj.name;
      expect(name).toEqual({
        type: String,
        required: true,
      });
    });

    test("type", () => {
      const type = Parcel.schema.obj.type;
      expect(type).toEqual({
        type: String,
      });
    });

    test("weight", () => {
      const weight = Parcel.schema.obj.weight;
      expect(weight).toEqual({
        type: Number,
        required: true,
      });
    });
  });
});
