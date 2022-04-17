import mongoose from "mongoose";
import { Truck } from "../truck.model";

describe("Truck model", () => {
  describe("schema", () => {
    test("name", () => {
      const name = Truck.schema.obj.name;
      expect(name).toEqual({
        type: String,
        required: true,
      });
    });

    test("weight", () => {
      const weight = Truck.schema.obj.weight;
      expect(weight).toEqual({
        type: Number,
        default: 0,
      });
    });

    test("parcels", () => {
      const parcels = Truck.schema.obj.parcels;
      expect(parcels).toEqual({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "parcel" }],
        default: [],
      });
    });
  });
});
