"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _truck = require("../truck.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Truck model", () => {
  describe("schema", () => {
    test("name", () => {
      const name = _truck.Truck.schema.obj.name;
      expect(name).toEqual({
        type: String,
        required: true
      });
    });
    test("weight", () => {
      const weight = _truck.Truck.schema.obj.weight;
      expect(weight).toEqual({
        type: Number,
        default: 0
      });
    });
    test("parcels", () => {
      const parcels = _truck.Truck.schema.obj.parcels;
      expect(parcels).toEqual({
        type: [{
          type: _mongoose.default.Schema.Types.ObjectId,
          ref: "parcel"
        }],
        default: []
      });
    });
  });
});